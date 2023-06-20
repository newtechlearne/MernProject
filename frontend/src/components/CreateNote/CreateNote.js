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
            })
            .then(() => {
                console.log("New Note Added");
                navigate("/dashboard");
            })
            .catch((error) => {
                console.error("Error creating note:", error);
            });
    };

    const [timer, setTimer] = useState(1500); // Initial timer value of 1500 seconds (25 minutes)
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isActive, timer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setTimer(1500); // Reset timer to 1500 seconds (25 minutes)
        setIsActive(false);
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

        charval.addEventListener("input", updateCounter);

        return () => {
            charval.removeEventListener("input", updateCounter);
        };
    }, []);

    useEffect(() => {
        function getRandomColor() {
            var letters = "0123456789ABCDEF";
            var color = "#";
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        const textareaElement = document.getElementById("textarea");
        textareaElement.style.backgroundColor = getRandomColor();
    }, []);

    useEffect(() => {
        let recognition = null;

        const handleVoiceRecognition = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");

            setContent(transcript);
        };

        const startVoiceRecognition = () => {
            recognition = new window.webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";

            recognition.addEventListener("result", handleVoiceRecognition);
            recognition.start();
        };

        const stopVoiceRecognition = () => {
            recognition.removeEventListener("result", handleVoiceRecognition);
            recognition.stop();
        };

        startVoiceRecognition();

        return () => {
            if (recognition) {
                stopVoiceRecognition();
            }
        };
    }, []);

    return ( <
        div className = "CreateForm" >
        <
        div className = "FormContent" >
        <
        form onSubmit = { handleSubmit } >
        <
        div className = "NoteForm" >
        <
        h3 className = "TextHead" > My Notes < /h3> <
        textarea id = "textarea"
        className = "NoteText"
        required value = { content }
        onChange = {
            (e) => setContent(e.target.value)
        }
        /> < /
        div >

        <
        div >
        <
        span id = "total-counter" > < /span> characters remaining:{" "} <
        span id = "remaining-counter" > < /span> < /
        div > <
        button className = "CreateNoteBtn"
        type = "submit" >
        Create Note <
        /button> < /
        form > <
        /div> <
        div className = "PomodoroTimer" >
        <
        h1 className = "Timer" > { formatTime(timer) } < /h1> <
        div className = "Controls" >
        <
        button className = { `Button ${isActive ? "Active" : ""}` }
        onClick = { toggleTimer } > { isActive ? "Pause" : "Start" } <
        /button> <
        button className = "Button"
        onClick = { resetTimer } >
        Reset <
        /button> < /
        div > <
        /div> < /
        div >
    );
};

export default CreateNote;