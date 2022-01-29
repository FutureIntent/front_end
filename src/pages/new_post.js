import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import InputField from './../styledComponents/inputField.js';
import SubmitButton from './../styledComponents/submitButton.js';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import styles from './../cssStyles/newPost.module.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Alert from '@mui/material/Alert';
import AlertMessage from './../styledComponents/alert.js';

function New_post() {

    const loginState = useSelector((state) => state.loginStatus.loggedIn);
    const adminState = useSelector((state) => state.loginStatus.admin);

    useEffect(() => {
        fetch("http://localhost:3001/user/admin", {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => { if (data.status === false) setMessage(data) })
            .catch(err => console.log(err))
    }, []);

    const [post, setPost] = useState({
        theme: "",
        text: "",
        urlImages: [],
        rawImages: []
    });

    const [message, setMessage] = useState();
     
    function handleImages(event) {

        const prevPost = post;
        prevPost.urlImages = [];
        prevPost.rawImages = [];
            
        for (let i = 0; i < event.target.files.length; i++) {

            let url = URL.createObjectURL(event.target.files[i]);
            let imageFile = event.target.files[i];

            prevPost.urlImages.push(url);
            prevPost.rawImages.push(imageFile);

        }

        setPost({...prevPost});

    }

    function handleText(event) {
        const text = event.target.value;
        setPost(prevState => {
            return {...prevState, [event.target.name]: text}
        });
    }

    function handleSubmit(event) {
        
        let formData = new FormData();

        formData.append('theme', post.theme);
        formData.append('text', post.text);
        post.rawImages.map((image) => {
            formData.append('images', image);
        });
        
        fetch('http://localhost:3001/post/create', {
            method: "POST",
            credentials: 'include',
            body: formData
        })
            .then(data => data.json())
            .then(data => setMessage(data))
            .catch(err => console.log(err))

        event.preventDefault();
    }

    //body image
    document.body.style = `width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(to right, rgba(0,0,0, 0.3) 0 100%),url("https://images5.alphacoders.com/764/thumb-1920-764519.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;`;

    const msg = message && <span>{message.message}</span>
    
    const imageList = post.urlImages.map((image, index) =>
        <img src={image} alt={index} key={ index } style={{width: "500px", height: "500px"}} />
    );

    const imageList2 = <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={164}>
        {post.urlImages.map((image,index) => (
            <ImageListItem key={index}>
                <img
                    src={image}
                    srcSet={image}
                    alt={index}
                    loading="lazy"
                />
            </ImageListItem>
        ))}
    </ImageList>

    return (
        <Container maxWidth="sm" >

            {message && <AlertMessage message={ message.message }/> }

            {(loginState && adminState) && <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: '5%' }} component="form" onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ width: '100%' }}>

                    <InputField
                        required
                        label="TITLE"
                        id="theme"
                        name="theme"
                        type="text"
                        variant="outlined"
                        value={post.theme}
                        onChange={handleText}
                    />

                    <textarea className={ styles.textarea } id="text" placeholder="TEXT" name="text" rows="30" cols="50" onChange={handleText} value={post.text}  />

                    <label className={ styles.label } htmlFor="image"> Add images </label>
                    <input className={ styles.label } type="file" id="image" name="image" accept="image/*" multiple onChange={handleImages} />
                    <br />

                    <SubmitButton type="submit">
                        Publish post
                    </SubmitButton>

                </Stack>

            </Box>
            }

            {imageList2}

        </Container>
        );
}

export default New_post;