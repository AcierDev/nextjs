'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Power, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image'

const API_BASE_URL = 'http://everwoodbackend.ddns.net:3004'

const controlOutlet = async (ip: string, action: 'on' | 'off') => {
  try {
    const response = await fetch(`${API_BASE_URL}/outlet/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Controlling outlet at ${ip}: Turn ${action}`, data);
    return true;
  } catch (error) {
    console.error('Error controlling outlet:', error);
    return false;
  }
}

export default function OutletControl() {
  const [status, setStatus] = useState(Array(7).fill('unknown'))
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState<number[]>([])
  const mountedRef = useRef(false)

  const devices = [
    { name: "New Compressor", ip: '192.168.1.182', icon: '/icons/air-compressor.png' },
    { name: "Old Compressor", ip: '192.168.1.183', icon: '/icons/air-compressor.png' },
    { name: "Paint Lights", ip: '192.168.1.184', icon: '/icons/led.png' },
    { name: "Paint AC", ip: '192.168.1.211', icon: '/icons/portable-ac.png' },
    { name: "Stage 1 Lights", ip: '192.168.1.185', icon: '/icons/led.png' },
    { name: "Stage 1 Compressor", ip: '192.168.1.203', icon: '/icons/small-compressor.png' },
    { name: "Stage 1 Motor", ip: '192.168.1.204', icon: '/icons/stepper.png' },
  ]

  const handleControl = async (index: number, action: 'on' | 'off') => {
    setError(null)
    setRefreshing(prev => [...prev, index])
    try {
      const success = await controlOutlet(devices[index].ip, action)
      if (success) {
        setStatus(prev => {
          const newStatus = [...prev]
          newStatus[index] = action
          return newStatus
        })
      } else {
        throw new Error('Failed to control device')
      }
    } catch (err) {
      setError(`Failed to ${action} ${devices[index].name}`)
      console.error(err)
    } finally {
      setRefreshing(prev => prev.filter(i => i !== index))
    }
  }

  const handleControlAll = async (action: 'on' | 'off') => {
    setError(null)
    setRefreshing(devices.map((_, i) => i))
    try {
      const results = await Promise.all(devices.map(device => controlOutlet(device.ip, action)))
      setStatus(prev => prev.map((_, i) => results[i] ? action : prev[i]))
    } catch (err) {
      setError(`Failed to ${action} all devices`)
      console.error(err)
    } finally {
      setRefreshing([])
    }
  }

  const getOutletStatus = useCallback(async (index: number) => {
    if (!mountedRef.current) return;
    setRefreshing(prev => [...prev, index])
    try {
      const response = await fetch(`${API_BASE_URL}/outlet/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip: devices[index].ip }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === undefined) {
        throw new Error('Received undefined status from server');
      }

      if (mountedRef.current) {
        setStatus(prev => {
          const newStatus = [...prev]
          newStatus[index] = data.status
          return newStatus
        })
      }
    } catch (err) {
      console.error(`Failed to get status for ${devices[index].name}:`, err)
      if (mountedRef.current) {
        setError(`Failed to get status for ${devices[index].name}`)
      }
    } finally {
      if (mountedRef.current) {
        setRefreshing(prev => prev.filter(i => i !== index))
      }
    }
  }, []) // Remove devices from the dependency array

  const fetchAllStatuses = useCallback(async () => {
    if (!mountedRef.current) return;
    setLoading(true)
    setError(null)
    try {
      await Promise.all(devices.map((device, index) => getOutletStatus(index)))
    } catch (err) {
      if (mountedRef.current) {
        setError('Failed to fetch statuses for all devices')
        console.error(err)
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, []) // Remove devices and getOutletStatus from the dependency array

  useEffect(() => {
    mountedRef.current = true;
    fetchAllStatuses();
    
    const intervalId = setInterval(() => {
      if (mountedRef.current) {
        fetchAllStatuses();
      }
    }, 30000);

    return () => {
      mountedRef.current = false;
      clearInterval(intervalId);
    }
  }, []) // Remove fetchAllStatuses from the dependency array

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Remote Device Control</h1>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-between mb-6">
        <Button onClick={() => handleControlAll('on')} disabled={loading || refreshing.length > 0} size="lg">
          <Power className="h-5 w-5 mr-2" />
          Turn All On
        </Button>
        <Button onClick={() => handleControlAll('off')} disabled={loading || refreshing.length > 0} size="lg" variant="outline">
          <Power className="h-5 w-5 mr-2" />
          Turn All Off
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {devices.map((device, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-secondary bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image src={device.icon} alt={device.name} width={48} height={48} className="dark:invert" />
                  <div>
                    <CardTitle>{device.name}</CardTitle>
                    <CardDescription>IP: {device.ip}</CardDescription>
                  </div>
                </div>
                <Badge variant={status[index] === 'on' ? 'default' : 'secondary'}>
                  {status[index] === 'unknown' ? 'Unknown' : status[index] === 'on' ? 'ON' : 'OFF'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className={`pt-6 ${
              status[index] === "on" 
                ? "bg-green-300 dark:bg-green-700" 
                : "bg-red-300 dark:bg-red-700"
            }`}>
              {loading ? (
                <Skeleton className="h-8 w-full" />
              ) : (
                <div className="flex items-center justify-between">
                  <span className="font-medium">Power</span>
                  <Switch
                    checked={status[index] === 'on'}
                    onCheckedChange={(checked) => handleControl(index, checked ? 'on' : 'off')}
                    disabled={refreshing.includes(index)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button onClick={fetchAllStatuses} disabled={loading} size="lg">
          <RefreshCw className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh All Statuses
        </Button>
      </div>
    </div>
  )
}