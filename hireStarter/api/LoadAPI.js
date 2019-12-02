import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { mockNames } from '../data/mockNames'
import { mockProfilePhotos } from '../data/mockProfilePhotos'
import { skills } from '../data/skills'

const mockOrgs = [
  "Apple",
  "HP",
  "Amazon",
  "Facebook",
  "Google",
  "Samsung",
  "Netflix",
  "Airbnb",
  "UCLA",
  "USC",
  "Raytheon",
  "IBM",
  "Stripe",
  "Paypal",
  "Uber",
  "Lyft",
  "MongoDB"
]

const mockHqs = [
  "https://i.imgur.com/pw7kg6r.jpg",
  "https://i.imgur.com/Khx7rGb.jpg",
  "https://i.imgur.com/wHkJfQ3.jpg",
  "https://i.imgur.com/FTWVBot.png",
  "https://i.imgur.com/6o6H7wO.png",
  "https://i.imgur.com/dBh8p14.jpg",
  "https://i.imgur.com/DnStqPh.jpg",
  "https://i.imgur.com/bMMlFBH.jpg",
  "https://i.imgur.com/cZq3a36.jpg",
  "https://i.imgur.com/qx5tTmR.jpg",
  "https://i.imgur.com/Gt1mAQA.jpg",
  "https://i.imgur.com/Yxw91xX.jpg",
  "https://i.imgur.com/REdM9aZ.jpg",
  "https://i.imgur.com/whwV9kI.jpg",
  "https://i.imgur.com/T9ZbN8k.jpg",
  "https://i.imgur.com/IcxPWAt.jpg",
  "https://i.imgur.com/50UbdFb.jpg"
]

const mockCities = [
  "Los Angeles",
  "Seattle",
  "San Francisco",
  "New York",
  "Chicago"
]

const LoadAPI = {
  generateRecruiters: (num) => {
    nameIndex = mockNames.length
    photoIndex = mockProfilePhotos.length
    skillsIndex = skills.length
    orgsIndex = mockOrgs.length
    citiesIndex = mockCities.length
    hqIndex = mockHqs.length
    for (index = 1; index <= num; index++) {
      console.log(index % hqIndex)
      data = {
        city: mockCities[index % citiesIndex],
        connections: [],
        description: "Hello, I am from " + mockOrgs[index % orgsIndex] + ", and I'm interested in meeting talented young engineers on this amazing platform. If you're interested in working for us, swipe right and we might be a match!",
        email: mockOrgs[index % orgsIndex] + "@email.com",
        image1: mockProfilePhotos[index % photoIndex],
        image2: mockHqs[index % hqIndex],
        name: mockNames[index % nameIndex],
        organization: mockOrgs[index % orgsIndex],
        potentials: ((index % 4) == 0) ? ["mkqT3RdDicPjDrJv1aJvhl5hiwq2"] : [],
        recruiter: true,
        skills: [skills[index % skillsIndex], skills[(index + 1) % skillsIndex], skills[(index + 2) % skillsIndex]],
        uid: index.toString()
      }
      firebase.firestore().collection('users').doc(`${data.uid}`).set(data)
      .then(function () {
        console.log("Document successfully created!")
      }).catch(function (error) {
        console.log("Error creating document:", error);
      });
    }
  },
  generateRecruitees: (num) => {
    num_range = num*100000
    nameIndex = mockNames.length
    photoIndex = mockProfilePhotos.length
    for (index = 100000; index <= num; index++) {
      
    }
  },
}

export default LoadAPI