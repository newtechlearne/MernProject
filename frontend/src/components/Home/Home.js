import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";

const Home = () => {
        const [noteList, setNotes] = useState([]);
        const [searchQuery, setSearchQuery] = useState("");
        const [filteredNotes, setFilteredNotes] = useState([]);

        const callFn = () => {
            const token = localStorage.getItem("token");

            axios
                .get(`${process.env.REACT_APP_NOTERAPP_BACKEND}/notes`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    console.log(res);
                    setNotes(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        };

        useEffect(() => {
            callFn();
        }, []);

        useEffect(() => {
            callFn();
        }, [setNotes]);

        useEffect(() => {
            function getRandomColor() {
                var letters = "0123456789ABCDEF";
                var color = "#";
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }

            const applyRandomColor = () => {
                const noteElements = document.querySelectorAll(".Note");
                noteElements.forEach((noteElement) => {
                    noteElement.style.backgroundColor = getRandomColor();
                });
            };

            applyRandomColor();
        }, [noteList]);

        useEffect(() => {
            const filterNotes = () => {
                const filtered = noteList.filter((note) =>
                    note.content.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilteredNotes(filtered);
            };

            filterNotes();
        }, [searchQuery, noteList]);

        return ( <
                div className = "Home" >
                <
                h1 className = "HomeNotes" > Notes < /h1>

                <
                input type = "text"
                value = { searchQuery }
                onChange = {
                    (e) => setSearchQuery(e.target.value) }
                placeholder = "Search notes..."
                className = "SearchInput" /
                >

                <
                Link to = "/create" >
                <
                button className = "AddBtn" > + < /button> <
                /Link>

                {
                    !filteredNotes || (filteredNotes.length === 0 && < h2 className = "NoNotesFound" > No Notes Found < /h2>)}

                        <
                        div className = "NoteList" > {
                            filteredNotes &&
                            filteredNotes.map((note) => ( <
                                div className = "Note"
                                key = { note._id } >
                                <
                                div className = "NoteContent" > { note.content } < /div> <
                                Link to = { `/deletetask/${note._id}` } >
                                <
                                span className = "DelIcon" >
                                <
                                DeleteIcon / >
                                <
                                /span> <
                                /Link> <
                                /div>
                            ))
                        } <
                        /div> <
                        /div>
                    );
                };

                export default Home;