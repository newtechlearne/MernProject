import axios from "axios";
import React, { useState } from "react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./CreateNote.css";

const CreateNote = () => {
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleSubmit = (e) => {
        e.preventDefault();
        const note = { content };

        axios({
            method: "POST",
            url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/notes`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: note,
        }).then(() => {
            console.log("New Note Added");
            navigate("/dashboard");
        });
    };

    useEffect(() => {
        const charval = document.getElementById("textarea");
        let totalCount = document.getElementById("total-counter");
        let remainingCount = document.getElementById("remaining-counter");

        let userChar = 0;

        const updateCounter = () => {
            userChar = charval.value.length;
            totalCount.innerText = userChar;
            remainingCount.innerText = 150 - userChar;
        };

        charval.addEventListener("keyup", updateCounter);

        const copyText = () => {
            charval.select();
            charval.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(charval.value);
        };

        return () => {
            charval.removeEventListener("keyup", updateCounter);
        };
    }, []);

    return (
        <div className="CreateForm">
            <div className="FormContent">
                <form onSubmit={handleSubmit}>
                    <div className="NoteForm">
                        <h3 className="TextHead">Note</h3>
                        <textarea
                            id="textarea" // added id for reference in JavaScript code
                            className="NoteText"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div>
                        <span id="total-counter"></span> characters
                        remaining: <span id="remaining-counter"></span>
                    </div>
                    <button className="CreateNoteBtn" onClick={handleSubmit}>
                        Create Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;
