import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { ReactNode } from "react";

interface AlertConfirmProps {
  buttonContent: ReactNode,
  title: string,
  description: string,
  onContinue: () => void;
  destructive?: boolean;
}

export function AlertConfirm({ buttonContent, title, description, onContinue, destructive }: AlertConfirmProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {destructive ? (
          <Button variant={"destructive"}>{buttonContent}</Button>
        ) : (
          <Button variant={"outline"}>{buttonContent}</Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
