import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { useState, useEffect } from "react";
import { db, storage } from './firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
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
    // const fetchAndSetImageList = async () => {
    //     try {
    //       const response = await listAll(imageListRef);

    //       // Use a temporary array to collect image URLs
    //       const tempImageList = [];

    //       const promises = response.items.map(async (item) => {
    //         const url = await getDownloadURL(item);
    //         tempImageList.push(url);
    //       });

    //       // Wait for all promises to resolve
    //       await Promise.all(promises);

    //       // After all promises are resolved, update the state once
    //       setImageList(tempImageList);

    //       console.log(tempImageList);
    //     } catch (error) {
    //       console.error('Error fetching and setting image list:', error);
    //     }
    //   };
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

            // Listen for real-time updates
            /* Your Firestore images collection reference */
            onSnapshot(imageListRef, (snapshot) => {
                const updatedImageList = snapshot.docs.map((doc) => doc.data().url);
                setImageList(updatedImageList);
            });

            console.log(tempImageList);
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
            <nav>
                <div class="nav__logo">Forklore<span>.</span></div>
                <ul class="nav__links">
                    <li class="link"><a href="#">Home</a></li>
                    <li class="link"><a href="#">Menu</a></li>
                    <li class="link"><a href="#">Offers</a></li>
                    <li class="link"><a href="#">Reviews</a></li>
                </ul>
                <button class="btn">Contact </button>
            </nav>
            <header>
                <div class="section__container header__container">
                    <div class="header__image">
                        <img src="assets/header-1.jpg" alt="header" />
                        <img src="assets/header-2.jpg" alt="header" />
                    </div>
                    <div class="header__content">
                        <div>
                            <p class="sub__header">Dine along us</p>
                            <h1>Welcome to the <br />Forklore</h1>
                            <p class="section__subtitle">
                                A feast for the eyes, a symphony for the senses.
                            </p>
                            <div class="action__btns">
                                <button class="btn">Start planning</button>
                                <div class="story">
                                    <div class="video__image">
                                        <img src="assets/story.jpg" alt="story" />
                                        <span><i class="ri-play-fill"></i></span>
                                    </div>
                                    <span>View food reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section class="section__container destination__container">
                <div class="section__header">
                    <div>
                        <h2 class="section__title">Choose from the global palate</h2>
                        <p class="section__subtitle">
                            Discover delicacies around the globe that suit you and your taste.
                        </p>
                    </div>
                    <div class="destination__nav">
                        <span><i class="ri-arrow-left-s-line"></i></span>
                        <span><i class="ri-arrow-right-s-line"></i></span>
                    </div>
                </div>
                <div class="destination__grid">
                    <div class="destination__card">
                        <img src="assets/food-1.jpg" alt="food" />
                        <div class="destination__details">
                            <p class="destination__title">Pasta</p>
                            <p class="destination__subtitle">Italian Cuisine</p>
                        </div>
                    </div>
                    <div class="destination__card">
                        <img src="assets/food-2.jpg" alt="food" />
                        <div class="destination__details">
                            <p class="destination__title">Biryani</p>
                            <p class="destination__subtitle">Indian Cuisine</p>
                        </div>
                    </div>
                    <div class="destination__card">
                        <img src="assets/food-3.jpg" alt="food" />
                        <div class="destination__details">
                            <p class="destination__title">Sushi</p>
                            <p class="destination__subtitle">Japanese Cuisine</p>
                        </div>
                    </div>
                    <div class="destination__card">
                        <img src="assets/food-4.jpg" alt="food" />
                        <div class="destination__details">
                            <p class="destination__title">Burger</p>
                            <p class="destination__subtitle">American Cuisine</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="trip">
                <div class="section__container trip__container">
                    <h2 class="section__title">Pick your order now!</h2>
                    <p class="section__subtitle">
                        Find the best deals for your meals.
                    </p>
                    <div class="trip__grid">
                        <div class="trip__card">
                            <img src="assets/item1.jpg" alt="item" />
                            <div class="trip__details">
                                <p>Breakfast </p>
                                <div class="rating"><i class="ri-star-fill"></i> 4.2</div>
                                <div class="booking__price">
                                    <div class="price"><span>Starts from</span> ₹300</div>
                                    <button class="book__now">Order Now</button>
                                </div>
                            </div>
                        </div>
                        <div class="trip__card">
                            <img src="assets/item2.png" alt="item" />
                            <div class="trip__details">
                                <p>Meals</p>
                                <div class="rating"><i class="ri-star-fill"></i> 4.5</div>
                                <div class="booking__price">
                                    <div class="price"><span>Starts from</span> ₹450</div>
                                    <button class="book__now">Order Now</button>
                                </div>
                            </div>
                        </div>
                        <div class="trip__card">
                            <img src="assets/item3.jpg" alt="item" />
                            <div class="trip__details">
                                <p>Beverages</p>
                                <div class="rating"><i class="ri-star-fill"></i> 4.7</div>
                                <div class="booking__price">
                                    <div class="price"><span>Starts from</span> ₹199</div>
                                    <button class="book__now">Order Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="view__all">
                        <button class="btn">View All</button>
                    </div>
                </div>
            </section>

            <section class="gallary">
                <div class="section__container gallary__container">
                    <div class="image__gallary">
                        <div class="gallary__col">
                            <img src="assets/gallery-1.jpg" alt="gallary" />
                        </div>
                        <div class="gallary__col">
                            <img src="assets/gallery-2.jpg" alt="gallary" />
                            <img src="assets/gallery-3.jpg" alt="gallary" />
                        </div>
                    </div>
                    <div class="gallary__content">
                        <div>
                            <h2 class="section__title">
                                Our event gallery
                            </h2>
                            <p class="section__subtitle">
                                Let us make your festivals colourful with our spices.

                            </p>
                            <button class="btn">View All</button>
                        </div>
                    </div>
                </div>
            </section>

            <section class="subscribe">
                <div class="section__container subscribe__container">
                    <div class="subscribe__content">
                        <h2 class="section__title">Refer your friends to get vouchers</h2>
                        <p class="section__subtitle">
                            Dine along us!
                        </p>
                    </div>
                    <div class="subscribe__form">
                        <form>
                            <input type="email" placeholder="Your email here" />
                            <button class="btn" type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </section>

            <footer class="footer">
                <div class="section__container footer__container">
                    <div class="footer__col">
                        <h3>Forklore<span>.</span></h3>
                        <p>
                            A feast for the eyes, a symphony for the senses.
                        </p>
                    </div>
                    <div class="footer__col">
                        <h4>Support</h4>
                        <p>FAQs</p>
                        <p>Terms & Conditions</p>
                        <p>Privacy Policy</p>
                        <p>Contact Us</p>
                    </div>
                    <div class="footer__col">
                        <h4>Address</h4>
                        <p>
                            <span>Address:</span> Batamore, Maheshtala, West Bengal
                        </p>
                        <p><span>Email:</span> thesoaringwarbler19@gmail.com </p>
                        <p><span>Phone:</span> +91 9988776655</p>
                    </div>
                </div>
                <div class="footer__bar">
                    Copyright © 2024 Sayanika Raha. All rights reserved.
                </div>
            </footer>
        </div>
    );
};