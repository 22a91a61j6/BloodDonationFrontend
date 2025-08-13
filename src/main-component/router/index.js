import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Homepage from '../HomePage/HomePage'
import HomePage2 from '../HomePage2/HomePage2';
import HomePage3 from '../HomePage3/HomePage3';
import HomePage4 from '../HomePage4/HomePage4';
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import DonationSinglePage from '../DonationSinglePage/DonationSinglePage';
import DonationListing from '../DonationListing/DonationListing';
import StorySinglePage from '../StorySinglePage/StorySinglePage';
import TeamPage from '../TeamPage/TeamPage';
import TeamSinglePage from '../TeamSinglePage/TeamSinglePage';
import EventPage from '../EventPage/EventPage';
import ShopPage from '../ShopPage/ShopPage';
import ProductSinglePage from '../ProductSinglePage/ProductSinglePage';
import CartPage from '../CartPage/CartPage';
import CheckoutPage from '../CheckoutPage/CheckoutPage';
import ServicePage from '../ServicePage/ServicePage';
import ServiceSinglePage from '../ServiceSinglePage/ServiceSinglePage';
import BlogPage from '../BlogPage/BlogPage';
import BlogDetails from '../BlogDetails/BlogDetails';
import EventSinglePage from '../EventSinglePage/EventSinglePage';
import ContactPage from '../ContactPage/ContactPage';

import StatisticsPage from '../../components/StatisticsPage/StatisticsPage'
import MyEventPage from '../../components/StatisticsPage/EventPage'
import Gallery from '../Gallery/Gallery'
import LiveCounts from '../../components/LiveCounts/LiveCounts';
import Registration from '../../components/registration/Registration';
import MyTeamPage from '../MyTeamPage/myTeamMain';

const AllRoute = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<HomePage4 />} />
          <Route path="home" element={<HomePage4 />} />
          <Route path="home-2" element={<HomePage2 />} />
          <Route path="home-3" element={<HomePage3 />} />
          <Route path="home-4" element={<HomePage4 />} />
          <Route path="/stats" element={<StatisticsPage />} />
          <Route path="/gallery" element = {<Gallery />} /> 
          <Route path="about" element={<AboutUsPage />} />
          <Route path="donation-listing" element={<DonationListing />} />
          <Route path="donation-details/:slug" element={<DonationSinglePage />} />
          <Route path="story-details/:slug" element={<StorySinglePage />} />
          <Route path="events" element={<MyEventPage />} />
          <Route path="event-single/:slug" element={<EventSinglePage />} />
          <Route path="volunteers" element={<TeamPage />} />
          <Route path="team-single/:slug" element={<TeamSinglePage />} />
          <Route path="products" element={<ShopPage />} />
          <Route path="product-single/:slug" element={<ProductSinglePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="service" element={<ServicePage />} />
          <Route path="service-single/:slug" element={<ServiceSinglePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog-details/:slug" element={<BlogDetails />} />

          <Route path="live-counts" element={<LiveCounts />} />
          <Route path="register" element={<Registration />} />
          <Route path='myTeamPage' element={<MyTeamPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default AllRoute;