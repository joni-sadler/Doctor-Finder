# Final project: Montreal Doctor Finder

# Introduction

This site allows those seeking healthcare in Montreal to access a comprehensive range of information about clinics and doctors in their area with ease and clarity. Inspired by challenges finding a family doctor in my area, I wanted to make a site that would allow doctors and clinics to share the most timely, relevant information with their customers without having to dig though the CLSC website or Google.

# Patient use

The site allows citizens to search for clinics based on various criteria: they can see which clinics have doctors that are accepting new patients, whether a clinic allows walk-in appointments, and if advance appointments are allowed without having a GP at that clinic. Users can enter their postal code to see a dynamic display of clinics near them with each of these criteria. Each clinic has a home page displaying their hours, contact info, and the doctors that practice there. Users can click on a doctor's name for additional information.

# Clinic and doctor use

Doctors and clinic administrators can register for the site directly, so they are in control of the information that is shared with the public. They can easily enter and update the info that is displayed, and while clinic contact info is displayed by default (as I feel that this is key information for users that should always be accessible), doctors have the ability to hide their email and/or phone number on the site for privacy reasons.

# Challenges and modifications

Initially this site was set up with Google Maps and Google's Geocoding API. After some initial testing it became clear that Google's charges would be prohibitive, so I swapped out OpenStreetMap in place of Google. This was a useful learning experience! Not only did it help to reinforce the importance of being flexible, but it was a good reminder to always have a backup plan. While OpenStreetMap may not have the geographical precision of Google Maps, it is a free and community-driven platform and that aligns nicely with my own ethos and the thinking behind this project.
