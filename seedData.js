const mongoose = require("mongoose");
const Event = require("./models/Event");
const Testimony = require("./models/Testimony");
const Partner = require("./models/Partner");
require("dotenv").config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Create sample events
    const events = await Event.insertMany([
      {
        title: "Sunday Worship Service",
        description: "Join us for powerful worship and the Word of God",
        date: new Date("2026-02-09"),
        time: "10:00 AM",
        location: "Main Church Building, Gayaza",
        category: "worship",
        isPublished: true,
      },
      {
        title: "Youth Conference 2026",
        description: "A transformative gathering for young people seeking God's purpose",
        date: new Date("2026-03-15"),
        time: "09:00 AM",
        location: "Conference Center, Kampala",
        category: "conference",
        isPublished: true,
      },
    ]);
    console.log(`✅ Created ${events.length} events`);

    // Create sample testimonies
    const testimonies = await Testimony.insertMany([
      {
        title: "God Restored My Life",
        content: "I was broken and lost, but God found me and transformed my life completely. Today I am a new creation in Christ.",
        author: {
          name: "John Mukasa",
          email: "john@example.com",
          phone: "0700111222"
        },
        category: "salvation",
        isApproved: true,
        isAnonymous: false,
      },
      {
        title: "Healing Testimony",
        content: "After years of sickness, God healed me completely. All glory to His name!",
        author: {
          name: "Sarah Nakato",
          email: "sarah@example.com",
          phone: "0700333444"
        },
        category: "healing",
        isApproved: true,
        isAnonymous: false,
      },
      {
        title: "Financial Breakthrough",
        content: "God opened doors I never imagined. He is faithful to His promises.",
        author: {
          name: "Anonymous",
          email: "anonymous@example.com"
        },
        category: "provision",
        isApproved: false,
        isAnonymous: true,
      },
    ]);
    console.log(`✅ Created ${testimonies.length} testimonies`);

    // Create sample partners
    const partners = await Partner.insertMany([
      {
        firstName: "David",
        lastName: "Kimuli",
        email: "david@example.com",
        phone: "0700123456",
        address: "Kampala, Uganda",
        gender: "male",
        dateOfBirth: "1990-05-15",
        salvationExperience: "yes",
        howHeard: "friend",
        interests: ["Prayer", "Evangelism"],
        skills: "Teaching, Music",
        status: "approved",
      },
      {
        firstName: "Grace",
        lastName: "Namukasa",
        email: "grace@example.com",
        phone: "0700654321",
        address: "Entebbe, Uganda",
        gender: "female",
        dateOfBirth: "1995-08-20",
        salvationExperience: "yes",
        howHeard: "social",
        interests: ["Worship", "Children Ministry"],
        skills: "Singing, Counseling",
        status: "pending",
      },
    ]);
    console.log(`✅ Created ${partners.length} partners`);

    console.log("\n✅ Sample data created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedData();
