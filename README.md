# Movie-Frontend
# Actually.js
--- Our project is a movie ticket booking website. It has sections of Home, Signin/Signup, My Profile, My bookings, etc. We have tmdb API for movie database and Razorpay Gateway for payment, which is in test mode. Further these sections will be described in the later part of this README file. ---

# Hosted URL 
https://kinoticket.netlify.app

# Features Implemented
## Frontend
--- Starting off with the **HOME** page, it begins with:
1. Navigation Bar
   1. Website name and Logo
   2. Search bar
   3. Navigation Sections
      1. Home: Active page
      2.  Movies: _The page under construction_
      3.  Theater: _The page under construction_
      4.  SignIn: Allows the user to SignIn, with a submenu to register himself if not.
2. Container with cards containing:
   1. Movie Title
   2. Ratings 
   3. Overview
3. Footer which as the name suggests is the end of this page has:
   1. Website logo
   2. Social media handles which is also under construction.
   3. About us: This page gives a brief description about the creaters of this website
   4. Contact us: This page lets the user leave his/her queries to us which goes to our database on submission. Also we have given the address where people can reach out to us.
   5. Feedback: This has a link to a google form for the user to leave us a feedback on our website.

Then comes the **other pages** which can be reached using the navigation bar. 

1. SignIn: In this page the user enters his/her email and password in the fields to signIn, on clicking the proceed button one has access to his profile, bookings and also can now book any movies.
2. Register: This page can be reached through the navigation bar as well as with the link in the sigin page. It has fields of name, email, contact, password and confirm password by filling which a person registers himself on our page and can now signin.
3. My Profile: This can also be reached through the navigation bar and has option to reset all the credentials of the user including resetting the password.
4. Bookings: This page also is reached using the navbar and displays all the successful and failed bookings made by the user.

Other than these we have pages to select:

1. Slot date and timings
2. Choice of seats 
3. A page consisting of the button to book the movies, its overview, trailer video and cast can be reached by clicking on the cards in the container of home page.
4. After selection of seats displays a page with the summary of your booking as well as the amount to be paid. It also has a pay now button which directs you to the payment gateway through razorpay API.
5. On payment a page with the baooking summary is displayed which also gives you an option to print the ticket.
