"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import Notification from "../components/notification";
import dynamic from "next/dynamic";
import { AddBudget, getBudgetsByUser } from "../actions";
import { Budget } from "@/type";
import Link from "next/link";
import BudgetItem from "../components/BudgetItem";
import { Landmark } from "lucide-react";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const page = () => {
    const { user } = useUser();
    const [budgetName, setBudgetName] = useState<string>("");
    const [budgetAmount, setBudgetAmount] = useState<string>("");
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [selectedEmoji, setSelectedEmoji] = useState<string>("");
    const [budgets, setBudgets] = useState<Budget[]>([]);

    const handleEmojiSelect = (emojiObject: { emoji: string }) => {
        setSelectedEmoji(emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const [notification, setNotification] = useState<string | null>(null);
    const closeNotification = () => {
        setNotification("");
    };
    const handleAddBudget = async () => {
        try {
            const amount = parseFloat(budgetAmount);
            if (isNaN(amount) || amount <= 0) {
                throw new Error("Montant invalide");
            }

            await AddBudget(
                user?.primaryEmailAddress?.emailAddress as string,
                budgetName,
                amount,
                selectedEmoji
            );

            fecthBudgets();

            const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
            if (modal) {
                modal.close();
            }
            setNotification("Nouveau Budget ajouté avec succès");
            setBudgetName("");
            setBudgetAmount("");
            setSelectedEmoji("");
            setShowEmojiPicker(false);
        } catch (error) {
            setNotification("Erreur lors de l'ajout du budget:");
        }
    };

    const fecthBudgets = async () => {
        if (user?.primaryEmailAddress?.emailAddress) {
            try {
                const userBudgets = await getBudgetsByUser(
                    user?.primaryEmailAddress?.emailAddress
                );
                setBudgets(userBudgets);
            } catch (error) {
                setNotification("Erreur lors de la récupération des budgets");
            }
        }
    };

    useEffect(() => {
        fecthBudgets();
    }, [user?.primaryEmailAddress?.emailAddress]);

    return (
        <Wrapper>
            {notification && (
                <Notification
                    message={notification}
                    onclose={closeNotification}
                ></Notification>
            )}

            <button
                className="btn btn-accent mb-4"
                onClick={() =>
                    (
                        document.getElementById("my_modal_3") as HTMLDialogElement
                    ).showModal()
                }
            >
                Nouveau budget
                <Landmark className="w-4" />
            </button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Création d'un budget</h3>
                    <p className="py-4">Permet de controler ces dépenses facilement</p>
                    <div className="w-full flex flex-col">
                        <input
                            type="text"
                            value={budgetName}
                            placeholder="Nom du budget"
                            onChange={(e) => setBudgetName(e.target.value)}
                            className="input input-bordered mb-3 w-full "
                            required
                        />

                        <input
                            type="number"
                            value={budgetAmount}
                            placeholder="Montant du budget"
                            onChange={(e) => setBudgetAmount(e.target.value)}
                            className="input input-bordered mb-3 w-full"
                            required
                        />

                        <button
                            className="btn btn-outline mb-3"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                            {selectedEmoji || "Sélectionnez un emoji 🫵"}
                        </button>

                        {showEmojiPicker && (
                            <EmojiPicker onEmojiClick={handleEmojiSelect} />
                        )}
                        <br />
                        <button onClick={handleAddBudget} className="btn btn-accent">
                            Ajouter Budget
                        </button>
                    </div>
                </div>
            </dialog>
            <ul className="grid md:grid-cols-3 gap-4">
                {budgets.map((budget) => (
                    <Link href={`/manage/${budget.id}`} key={budget.id}>
                        <BudgetItem budget={budget} enableHover={1}></BudgetItem>
                    </Link>
                ))}
            </ul>

        </Wrapper>
    );
};

export default page;
