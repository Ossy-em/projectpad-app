"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";



export default function NewProjectWizard({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    // TODO: Replace with actual POST
    console.log({ title, description, type });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">What type of project is this?</h2>
            <div className="grid grid-cols-2 gap-2">
              {["thesis", "capstone", "essay", "market-research", "self-research", "other"].map((t) => (
                <Button
                  key={t}
                  variant={type === t ? "default" : "outline"}
                  onClick={() => setType(t)}
                >
                  {t.replace("-", " ")}
                </Button>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={handleNext} disabled={!type}>Next</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Project Details</h2>
            <Input placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>Back</Button>
              <Button onClick={handleSubmit} disabled={!title.trim()}>Create Project</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
