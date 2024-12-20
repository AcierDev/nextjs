"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  type DropResult,
  Droppable,
  type ResponderProvided,
} from "@hello-pangea/dnd";
import { ItemStatus, type Board, type Group, type Item } from "@/typings/types";
import { ItemGroupSection } from "./ItemGroup";
import { useUser } from "@/contexts/UserContext";
import { getUserPermissions } from "@/app/actions/auth";

interface ItemListProps {
  board: Board;
  groups: Group[];
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
  onDelete: (itemId: string) => void;
  onGetLabel: (item: Item) => void;
  onMarkCompleted: (itemId: string) => void;
  onShip: (itemId: string) => void;
}

export const ItemList: React.FC<ItemListProps> = ({
  board,
  groups,
  onDragEnd,
  onDelete,
  onGetLabel,
  onMarkCompleted,
  onShip,
}) => {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      if (user) {
        const permissions = await getUserPermissions(user);
        setIsAdmin(permissions.includes("admin"));
      } else {
        setIsAdmin(false);
      }
    };

    fetchPermissions();
  }, [user]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex-grow">
        {groups
          .filter((group) =>
            isAdmin ? true : group.title !== ItemStatus.Hidden
          )
          .map((group) => (
            <ItemGroupSection
              key={group.id}
              board={board}
              group={group}
              onDelete={onDelete}
              onGetLabel={onGetLabel}
              onMarkCompleted={onMarkCompleted}
              onShip={onShip}
            />
          ))}
      </div>
    </DragDropContext>
  );
};
