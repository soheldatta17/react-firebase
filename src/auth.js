import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { useState, useEffect } from "react";
import { db, storage } from './firebase';
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
export const Auth = () => {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [moviesList, setMoviesList] = useState([])
    const [movies, setMovies] = useState("")
    const [date, setDate] = useState(0)
    const [oscar, setOscar] = useState(false)
    const [show, setShow] = useState(false)
    const [fileupload, setFileupload] = useState(null)
    const [imageList, setImageList] = useState([])
    // const [show, setShow] = useState(false)
    const moviesCollectionRef = collection(db, "movies")
    const getmovies = async () => {
        try {
            const data = await getDocs(moviesCollectionRef)
            // setMoviesList(data)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            // console.log(filteredData)
            setMoviesList(filteredData)
        }
        catch (err) { console.error(err) }
    }
    const imageListRef = ref(storage, `projectFiles/`)
    const fetchAndSetImageList = async () => {
        try {
          const response = await listAll(imageListRef);
      
          // Use a temporary array to collect image URLs
          const tempImageList = [];
      
          const promises = response.items.map(async (item) => {
            const url = await getDownloadURL(item);
            tempImageList.push(url);
          });
      
          // Wait for all promises to resolve
          await Promise.all(promises);
      
          // After all promises are resolved, update the state once
          setImageList(tempImageList);

          console.log(imageList);
        } catch (error) {
          console.error('Error fetching and setting image list:', error);
        }
      };
      
      // Call the function when needed
      useEffect(() => {

        fetchAndSetImageList();
      
        getmovies();
      }, []);
        

    return (
        <div>
            <input placeholder="Email..." type="text" value={Email} onChange={(Event) => {
                setEmail(Event.target.value);
            }}
            />
            <input placeholder="Password..." type={show ? "text" : "password"} value={Password} onChange={(Event) => {
                setPassword(Event.target.value);
            }}
            />
            <button onClick={() => {
                if (show === false) {
                    setShow(true)
                }
                else {
                    setShow(false)
                }
            }}>Show</button>
            <div>
                <input placeholder="Title..." type="text" value={movies} onChange={(Event) => {
                    setMovies(Event.target.value);
                }}
                />
                <input placeholder="Year..." type="number" value={date} onChange={(Event) => {
                    setDate(Event.target.value);
                }}
                />
                <input type="checkbox" value={oscar} onChange={() => {
                    if (oscar) {
                        setOscar(false)
                    }
                    else {
                        setOscar(true)
                    }
                    // alert(oscar)
                }}
                />
                {/* <button onClick={() => alert(oscar)}>show oscar</button> */}
                <button onClick={async () => {
                    if (movies === "" || date === "0") {
                        alert("Please Enter all Fields")
                    }
                    else {
                        if (auth?.currentUser?.email !== undefined) {
                            try {
                                await addDoc(moviesCollectionRef, {
                                    date: Number(date),
                                    oscar_recieved: oscar,
                                    title: movies,
                                    email: auth?.currentUser?.email
                                })
                                alert("Successfully Submitted")
                                getmovies();
                            }
                            catch (err) {
                                console.error(err);
                            }
                        }
                        else {
                            alert("Not Signed In")
                        }
                    }
                }}>Add</button>
            </div>
            <button onClick={async () => {
                if (Email === "" || Password === "") {
                    alert("Please Enter all Fields")
                }
                else {
                    try {
                        await createUserWithEmailAndPassword(auth, Email, Password)
                        alert("Successfully Submitted")
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
            }}>Sign In</button>
            <button onClick={async () => {
                if (auth?.currentUser?.photoURL !== null && auth?.currentUser?.email !== undefined) {
                    alert(auth?.currentUser?.photoURL)
                    alert(auth?.currentUser?.email)
                    setEmail(auth?.currentUser?.email)
                }
                else if (auth?.currentUser?.email !== undefined) {
                    alert(auth?.currentUser?.email)
                    setEmail(auth?.currentUser?.email)
                }
                else {
                    alert("Not Signed In")
                }
            }}>Log In</button>
            <button onClick={async () => {

                try {
                    alert("a")
                    await signInWithPopup(auth, googleProvider)
                    alert("Successfully Submitted")
                }
                catch (err) {
                    console.error(err);
                }

            }}>Sign In with Google</button>
            <button onClick={async () => {

                try {
                    await signOut(auth)
                    setEmail("")
                    setPassword("")
                    alert("Successfully Logged Out")
                }
                catch (err) {
                    console.error(err);
                }

            }}>Logout</button>
            <div>
                {moviesList.map((movie) => (
                    <div>
                        <h1>{movie.title}</h1>
                        <p>{movie.date}</p>
                        <button onClick={async () => {
                            if (auth?.currentUser?.email !== undefined) {
                                if (auth?.currentUser?.email == movie.email) {
                                    try {
                                        await deleteDoc(doc(db, "movies", movie.id))
                                        getmovies();
                                    }
                                    catch (err) {
                                        console.error(err)
                                    }
                                }
                                else {
                                    alert("Its not created by you")
                                }
                            }
                            else {
                                alert("Not Signed In")
                            }

                        }}>Delete</button>
                    </div>
                ))}

            </div>
            <br />
            <div>
                <input type="file" onChange={(Event) => setFileupload(Event.target.files[0])} />
                <button onClick={async () => {
                    if (fileupload == null) {
                        alert("Please select a file")
                        return
                    }
                    else {
                        try {
                            const filesFolderRef = ref(storage, `projectFiles/${fileupload.name}`)
                            await uploadBytes(filesFolderRef, fileupload)
                            alert("File Sucessfully Uploaded")
                            fetchAndSetImageList()
                        }
                        catch (err) {
                            console.error(err)
                        }
                    }
                }}>Upload</button>

                <br />
                {imageList.map((url, index) => (
                    <img key={index} src={url} alt={`Image ${index}`} />
                ))}

            </div>
        </div>
    );
};