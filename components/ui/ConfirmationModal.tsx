import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { LucideIcon } from "lucide-react"; 

interface ConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "danger" | "warning" | "success" | "default";
  onConfirm: () => void;
  isDangerous?: boolean;
  warningMessage?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  icon: Icon,
  iconColor = "text-danger",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "danger",
  onConfirm,
  isDangerous = false,
  warningMessage,
}) => {
  return (
    <Modal
  isOpen={isOpen}
  onOpenChange={onOpenChange}
  classNames={{
    base: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-2xl", 
    header: "border-b border-neutral-200 dark:border-neutral-700 px-6 py-4 text-lg font-semibold",
    body: "px-6 py-4 text-neutral-700 dark:text-neutral-200",
    footer: "border-t border-neutral-200 dark:border-neutral-700 px-6 py-4 flex justify-end gap-3",
    backdrop: "bg-black/70 backdrop-blur-sm", // darker background, less transparent
  }}
>
  <ModalContent>
    <ModalHeader className="flex gap-2 items-center">
      {Icon && <Icon className={`h-6 w-6 ${iconColor}`} />}
      <span>{title}</span>
    </ModalHeader>
    <ModalBody>
      {isDangerous && warningMessage && (
        <div className="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 p-4 rounded-lg mb-4">
          <div className="flex items-start gap-3">
            {Icon && (
              <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconColor}`} />
            )}
            <div>
              <p className="font-medium">⚠️ This action cannot be undone</p>
              <p className="text-sm mt-1">{warningMessage}</p>
            </div>
          </div>
        </div>
      )}
      <p>{description}</p>
    </ModalBody>
    <ModalFooter>
      <Button
        variant="flat"
        color="default"
        onClick={() => onOpenChange(false)}
        className="rounded-xl"
      >
        {cancelText}
      </Button>
      <Button
        color={confirmColor}
        onClick={() => {
          onConfirm();
          onOpenChange(false);
        }}
        startContent={Icon && <Icon className="h-4 w-4" />}
        className="rounded-xl shadow-md"
      >
        {confirmText}
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

  );
};

export default ConfirmationModal;
