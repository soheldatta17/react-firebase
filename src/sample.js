import React from 'react';
import { useState } from 'react';
import image1 from './assets/header-1.jpg';
import image2 from './assets/header-2.jpg';
import storyImage from './assets/story.jpg';
import food1Image from './assets/food-1.jpg';
import food2Image from './assets/food-2.jpg';
import food3Image from './assets/food-3.jpg';
import food4Image from './assets/food-4.jpg';
import item1Image from './assets/item1.jpg';
import item2Image from './assets/item2.png';
import item3Image from './assets/item3.jpg';
import gallery1Image from './assets/gallery-1.jpg';
import gallery2Image from './assets/gallery-2.jpg';
import gallery3Image from './assets/gallery-3.jpg';

export const Auth = () => {
    const [showDetails, setShowDetails] = useState("More");

    const handleButtonClick = () => {
        if (showDetails == "More") {
            setShowDetails("Less")
        }
        else {
            setShowDetails("More")
        }
    };
    return (
        <>
            <nav>
                <div className="nav__logo">Foodies<span>.</span></div>
                <ul className="nav__links">
                    <li class="link" data-content="Home">
                        <a href="#">Home</a>
                        <div class="hover-content">
                            <p>Menu 1</p>
                            <p>Menu 2</p>
                            <p>Menu 3</p>
                        </div>
                    </li>
                    <li className="link"><a href="#">Menu</a></li>
                    <li className="link"><a href="#">Offers</a></li>
                    <li className="link"><a href="#">Reviews</a></li>
                </ul>
                <button className="btn">Contact </button>
            </nav>

            <header>
                <div className="section__container header__container">
                    <div className="header__image">

                    </div>
                    <div className="header__content">
                        <div>
                            <p className="sub__header">Dine along us</p>
                            <h1>Welcome to the <br />Foodies</h1>
                            <p className="section__subtitle">
                                A feast for the eyes, a symphony for the senses.
                            </p>
                            <div className="action__btns">
                                <button className="btn">Start planning</button>
                                <div className="story">
                                    <div className="video__image">
                                        <img src={storyImage} alt="story" />
                                        <span><i className="ri-play-fill"></i></span>
                                    </div>
                                    <span>View food reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="section__container destination__container">
                <div className="section__header">
                    <div>
                        <h2 className="section__title">Choose from the global palate</h2>
                        <p className="section__subtitle">
                            Discover delicacies around the globe that suit you and your taste.
                        </p>
                    </div>
                    <div className="destination__nav">
                        <span><i className="ri-arrow-left-s-line"></i></span>
                        <span><i className="ri-arrow-right-s-line"></i></span>
                    </div>
                </div>
                <div className="destination__grid">
                    <div className="destination__card">
                        <img src={food1Image} alt="food-1" />
                        <div className="destination__details">
                            <p className="destination__title">Pasta</p>
                            <p className="destination__subtitle">Italian Cuisine</p>
                        </div>
                    </div>
                    <div className="destination__card">
                        <img src={food2Image} alt="food-2" />
                        <div className="destination__details">
                            <p className="destination__title">Biryani</p>
                            <p className="destination__subtitle">Indian Cuisine</p>
                        </div>
                    </div>
                    <div className="destination__card">
                        <img src={food3Image} alt="food-3" />
                        <div className="destination__details">
                            <p className="destination__title">Sushi</p>
                            <p className="destination__subtitle">Japanese Cuisine</p>
                        </div>
                    </div>
                    <div className="destination__card">
                        <img src={food4Image} alt="food-4" />
                        <div className="destination__details">
                            <p className="destination__title">Burger</p>
                            <p className="destination__subtitle">American Cuisine</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="trip">
                <div className="section__container trip__container">
                    <h2 className="section__title">Pick your order now!</h2>
                    <p className="section__subtitle">
                        Find the best deals for your meals.
                    </p>
                    <div className="trip__grid">
                        <div className="trip__card">
                            <img src={item1Image} alt="item1" />
                            <div className="trip__details">
                                <p>Breakfast </p>
                                <div className="rating"><i className="ri-star-fill"></i> 4.2</div>
                                <div className="booking__price">
                                    <div className="price"><span>Starts from</span> ₹300</div>
                                    <button className="book__now">Order Now</button>
                                </div>
                            </div>
                        </div>
                        <div className="trip__card">
                            <img src={item2Image} alt="item2" />
                            <div className="trip__details">
                                <p>Meals</p>
                                <div className="rating"><i className="ri-star-fill"></i> 4.5</div>
                                <div className="booking__price">
                                    <div className="price"><span>Starts from</span> ₹450</div>
                                    <button className="book__now">Order Now</button>
                                </div>
                            </div>
                        </div>
                        <div className="trip__card">
                            <img src={item3Image} alt="item3" />
                            <div className="trip__details">
                                <p>Beverages</p>
                                <div className="rating"><i className="ri-star-fill"></i> 4.7</div>
                                <div className="booking__price">
                                    <div className="price"><span>Starts from</span> ₹199</div>
                                    <button className="book__now">Order Now</button>
                                </div>
                            </div>
                        </div>
                        <div className="trip__card" style={{ display: showDetails == "Less" ? 'block' : 'none' }}>
                            <img src={item3Image} alt="item3" />
                            <div className="trip__details">
                                <p>Beverages</p>
                                <div className="rating"><i className="ri-star-fill"></i> 4.7</div>
                                <div className="booking__price">
                                    <div className="price"><span>Starts from</span> ₹199</div>
                                    <button className="book__now">Order Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="view__all">
                        <button className="btn" onClick={handleButtonClick}>View {showDetails}</button>
                    </div>
                </div>
            </section>

            <section className="gallary">
                <div className="section__container gallary__container">
                    <div className="image__gallary">
                        <div className="gallary__col">
                            <img src={gallery1Image} alt="gallery-1" />
                        </div>
                        <div className="gallary__col">
                            <img src={gallery2Image} alt="gallery-2" />
                            <img src={gallery3Image} alt="gallery-3" />
                        </div>
                    </div>
                    <div className="gallary__content">
                        <div>
                            <h2 className="section__title">
                                Our event gallery
                            </h2>
                            <p className="section__subtitle">
                                Let us make your festivals colourful with our spices.
                            </p>
                            <button className="btn">View All</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="subscribe">
                <div className="section__container subscribe__container">
                    <div className="subscribe__content">
                        <h2 className="section__title">Refer your friends to get vouchers</h2>
                        <p className="section__subtitle">
                            Dine along us!
                        </p>
                    </div>
                    <div className="subscribe__form">
                        <form>
                            <input type="email" placeholder="Your email here" />
                            <button className="btn" type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="section__container footer__container">
                    <div className="footer__col">
                        <h3>Foodies<span>.</span></h3>
                        <p>
                            A feast for the eyes, a symphony for the senses.
                        </p>
                    </div>
                    <div className="footer__col">
                        <h4>Support</h4>
                        <p>FAQs</p>
                        <p>Terms & Conditions</p>
                        <p>Privacy Policy</p>
                        <p>Contact Us</p>
                    </div>
                    <div className="footer__col">
                        <h4>Address</h4>
                        <p>
                            <span>Address:</span> Batamore, Maheshtala, West Bengal
                        </p>
                        <p><span>Email:</span> thesoaringwarbler19@gmail.com </p>
                        <p><span>Phone:</span> +91 9988776655</p>
                    </div>
                </div>
                <div className="footer__bar">
                    Copyright © 2024 Sohel. All rights reserved.
                </div>
            </footer>
        </>
    );
}

// export default Auth;
