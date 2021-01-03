import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NotValidWebpage, Message, NoteList, CreateNewNote } from './style'
import WomanLookingAtWebPageImage from "../../assets/woman-looking-at-webpage.png"
import ManPostingNote from "../../assets/man-posting-note.png"
import MiniSearchNote from '../MiniSearchNote'
const CurrentPageNotes = (props) => {
    const [url, setCurrentUrl] = useState('')

    useEffect(() => {
        chrome.tabs.query({ active: true }, tabs => {
            let url = tabs[0].url
            setCurrentUrl(url)
        });
    }, [])

    const NotValidPage = () => {
        return <NotValidWebpage>
            <img style={{ width: "300px", height: "auto", objectFit: "cover" }} src={WomanLookingAtWebPageImage} ></img>
            <Message bold>We can't place a note on this page. Go to any webpage to add a note such as <a href="https://google.com" target="_blank">google.com</a></Message>
        </NotValidWebpage>
    }

    const RenderNoValidNote = () => {
        if ((!Object.keys(props.notes).includes(url) || props.notes[url].notes.length == 0) && IsValidUrl()) {
            return <CreateNewNote>
                <Message bold>There are no notes on this page. </Message>
                <img src={ManPostingNote}></img>
                <button onClick={props.createNewNote}>Create New Note</button>
            </CreateNewNote>
        }
    }
    const IsValidUrl = () => {
        return !(url == '' || url == null || url == undefined || !url.match(/https?/))
    }


    return (
        <NoteList>
            <p className="title">Current Notes on Page</p>
            { !IsValidUrl(url) && NotValidPage()}
            {
                IsValidUrl(url) && Object.keys(props.notes).map(key => {
                    if (key == url) {
                        return props.notes[key].notes.map(note => {
                            return <MiniSearchNote {...note} website={key}></MiniSearchNote>
                        })
                    }
                })
            }
            {RenderNoValidNote()}
        </NoteList>)
}

const mapStateToProps = (state) => {
    return { notes: state }
}

export default connect(mapStateToProps, null)(CurrentPageNotes)