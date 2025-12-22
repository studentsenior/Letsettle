import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Debate from '@/models/Debate';
import Option from '@/models/Option';
import { slugify } from '@/lib/utils';

// // Data to seed
// const SEED_DEBATES = [
//   {
//     title: "Best Batsman of All Time",
//     category: "Sports",
//     subCategory: "Cricket",
//     options: ["Sachin Tendulkar", "Virat Kohli", "MS Dhoni", "Rohit Sharma", "Sunil Gavaskar"],
//   },
//   {
//     title: "Best IPL Team",
//     category: "Sports",
//     subCategory: "Cricket",
//     options: ["CSK", "MI", "RCB", "KKR", "RR"],
//   },
//   {
//     title: "Best Indian Prime Minister",
//     category: "Politics",
//     options: ["Narendra Modi", "Atal Bihari Vajpayee", "Jawaharlal Nehru", "Indira Gandhi"],
//   },
//   {
//     title: "Best Indian YouTuber",
//     category: "Entertainment",
//     subCategory: "Creators",
//     options: ["CarryMinati", "Ashish Chanchlani", "BB Ki Vines", "Triggered Insaan"],
//   },
//   {
//     title: "Most Underrated Indian YouTuber",
//     category: "Entertainment",
//     subCategory: "Creators",
//     options: ["Dhruv Rathee", "Saiman Says", "Slayy Point", "Anurag Salgaonkar"],
//   },
//   {
//     title: "Best Street Food in India",
//     category: "Food",
//     options: ["Pani Puri", "Vada Pav", "Chole Bhature", "Dosa", "Samosa"],
//   },
//   {
//     title: "Tea vs Coffee",
//     category: "Food",
//     options: ["Tea", "Coffee"],
//   },
//   {
//     title: "Best Engineering Branch",
//     category: "Education",
//     options: ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics"],
//   },
//   {
//     title: "Best Programming Language for Freshers",
//     category: "Technology",
//     subCategory: "Programming",
//     options: ["JavaScript", "Python", "Java", "C++", "TypeScript"],
//   },
//   {
//     title: "Best Smartphone Brand in India",
//     category: "Technology",
//     subCategory: "Mobile",
//     options: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Realme"],
//   },
//   {
//     title: "Best OTT Platform in India",
//     category: "Entertainment",
//     subCategory: "OTT",
//     options: ["Netflix", "Amazon Prime", "Hotstar", "Sony LIV", "Zee5"],
//   },
//   {
//     title: "Work From Home vs Office",
//     category: "Career",
//     options: ["Work From Home", "Office", "Hybrid"],
//   },
//   {
//     title: "Best City to Live in India",
//     category: "Lifestyle",
//     options: ["Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad"],
//   },
//   {
//     title: "Android vs iPhone",
//     category: "Technology",
//     subCategory: "Mobile",
//     options: ["Android", "iPhone"],
//   },
//   {
//     title: "Is Government Job Better Than Private Job?",
//     category: "Career",
//     options: ["Government Job", "Private Job", "Depends on Person"],
//   },
// ];

const SEED_DEBATES = [
  // 🔥 Sports
  {
    title: "Greatest Indian Cricketer After Sachin",
    category: "Sports",
    subCategory: "Cricket",
    options: ["Virat Kohli", "MS Dhoni", "Kapil Dev", "Rohit Sharma"],
  },
  {
    title: "Best Indian Captain of All Time",
    category: "Sports",
    subCategory: "Cricket",
    options: ["MS Dhoni", "Virat Kohli", "Sourav Ganguly", "Kapil Dev"],
  },
  {
    title: "GOAT Footballer of All Time",
    category: "Sports",
    subCategory: "Football",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Pele", "Maradona"],
  },
  {
    title: "Most Loyal IPL Fanbase",
    category: "Sports",
    subCategory: "Cricket",
    options: ["CSK", "RCB", "MI", "KKR"],
  },

  // 🎬 Entertainment
  {
    title: "Best Bollywood Actor of All Time",
    category: "Entertainment",
    subCategory: "Bollywood",
    options: ["Shah Rukh Khan", "Aamir Khan", "Amitabh Bachchan", "Salman Khan"],
  },
  {
    title: "Most Overrated Bollywood Actor",
    category: "Entertainment",
    subCategory: "Bollywood",
    options: ["Salman Khan", "Tiger Shroff", "Varun Dhawan", "Arjun Kapoor"],
  },
  {
    title: "Best Indian Web Series Ever",
    category: "Entertainment",
    subCategory: "OTT",
    options: ["Sacred Games", "Mirzapur", "The Family Man", "Scam 1992"],
  },
  {
    title: "Best OTT Platform for Indians",
    category: "Entertainment",
    subCategory: "OTT",
    options: ["Netflix", "Amazon Prime", "Hotstar", "Sony LIV"],
  },

  // 🎥 Creators & YouTube
  {
    title: "Most Influential Indian YouTuber",
    category: "Entertainment",
    subCategory: "Creators",
    options: ["CarryMinati", "BB Ki Vines", "Ashish Chanchlani", "Dhruv Rathee"],
  },
  {
    title: "Best Educational YouTuber in India",
    category: "Education",
    subCategory: "Creators",
    options: ["Physics Wallah", "Unacademy", "Vedantu", "Byju’s"],
  },
  {
    title: "Most Overrated Indian YouTuber",
    category: "Entertainment",
    subCategory: "Creators",
    options: ["CarryMinati", "Triggered Insaan", "Flying Beast", "Elvish Yadav"],
  },
  {
    title: "Best Tech YouTuber in India",
    category: "Technology",
    subCategory: "Creators",
    options: ["Technical Guruji", "Geeky Ranjit", "Trakin Tech", "Beebom"],
  },

  // 🏛️ Politics
  {
    title: "Most Powerful Indian Prime Minister",
    category: "Politics",
    options: ["Narendra Modi", "Indira Gandhi", "Jawaharlal Nehru"],
  },
  {
    title: "Best Indian Political Leader Today",
    category: "Politics",
    options: ["Narendra Modi", "Rahul Gandhi", "Arvind Kejriwal"],
  },
  {
    title: "Is Democracy Better Than Monarchy?",
    category: "Politics",
    options: ["Democracy", "Monarchy"],
    isMoreOptionAllowed: false,
  },

  // 💻 Technology
  {
    title: "Best Programming Language in 2025",
    category: "Technology",
    subCategory: "Programming",
    options: ["JavaScript", "Python", "Java", "Rust"],
  },
  {
    title: "Best Framework for Web Development",
    category: "Technology",
    subCategory: "Programming",
    options: ["React", "Next.js", "Angular", "Vue"],
  },
  {
    title: "AI Will Replace Jobs?",
    category: "Technology",
    options: ["Yes", "No", "Partially"],
    isMoreOptionAllowed: false,
  },
  {
    title: "Best Laptop Brand for Developers",
    category: "Technology",
    options: ["Apple", "Dell", "HP", "Lenovo"],
  },

  // 📱 Mobile & Gadgets
  {
    title: "Best Android Phone Brand in India",
    category: "Technology",
    subCategory: "Mobile",
    options: ["Samsung", "OnePlus", "Xiaomi", "Pixel"],
  },
  {
    title: "Is iPhone Worth the Price?",
    category: "Technology",
    subCategory: "Mobile",
    options: ["Yes", "No", "Depends"],
    isMoreOptionAllowed: false,
  },

  // 🎓 Education & Career
  {
    title: "Is College Degree Still Important?",
    category: "Education",
    options: ["Yes", "No", "Depends"],
    isMoreOptionAllowed: false,
  },
  {
    title: "Best Career Option in 2025",
    category: "Career",
    options: ["Software Engineer", "Data Scientist", "YouTuber", "Entrepreneur"],
  },
  {
    title: "Is Coding Better Than MBA?",
    category: "Career",
    options: ["Coding", "MBA", "Depends"],
    isMoreOptionAllowed: false,
  },

  // 💰 Money & Lifestyle
  {
    title: "Best Investment Option for Indians",
    category: "Finance",
    options: ["Stock Market", "Real Estate", "Gold", "Crypto"],
  },
  {
    title: "Is Crypto the Future of Money?",
    category: "Finance",
    options: ["Yes", "No", "Too Risky"],
    isMoreOptionAllowed: false,
  },
  {
    title: "Rich Life vs Peaceful Life",
    category: "Lifestyle",
    options: ["Rich Life", "Peaceful Life"],
    isMoreOptionAllowed: false,
  },

  // 🌍 Society & Trends
  {
    title: "Social Media Is Good or Bad?",
    category: "Lifestyle",
    options: ["Good", "Bad", "Depends"],
    isMoreOptionAllowed: false,
  },
  {
    title: "Is India Ready for Electric Vehicles?",
    category: "Technology",
    options: ["Yes", "No", "Partially"],
    isMoreOptionAllowed: false,
  },
  {
    title: "Best City for Startup Founders in India",
    category: "Business",
    options: ["Bangalore", "Delhi", "Mumbai", "Hyderabad"],
  },
];



export async function GET() {
  await dbConnect();

  try {
    const results = [];

    for (const data of SEED_DEBATES) {
      const slug = slugify(data.title);
      
      const existing = await Debate.findOne({ slug });
      if (existing) {
        results.push(`Skipped: ${data.title} (Exists)`);
        continue;
      }

      const debate = await Debate.create({
        slug,
        title: data.title,
        category: data.category,
        subCategory: data.subCategory,
        totalVotes: Math.floor(Math.random() * 500) + 10, // Random initial votes simulation
        isActive: true,
      });

      const optionDocs = data.options.map((optName) => ({
        debateId: debate._id,
        name: optName,
        votes: Math.floor(Math.random() * 100), // Random starting votes
      }));

      await Option.insertMany(optionDocs);
      
      // Update total votes to match options sum
      const total = optionDocs.reduce((acc, curr) => acc + curr.votes, 0);
      await Debate.findByIdAndUpdate(debate._id, { totalVotes: total });
      results.push(`Created: ${data.title}`);
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
