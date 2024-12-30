import React, { useState,useEffect } from "react";
import axios from "axios";
import './App.css';
import photo from "./images/Aditya_photo.png";
import chatBot from "./images/chatbot.png"

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (input.trim() === "") return;
    try {
      const res = await axios.post("http://3.91.189.220:5000/api/chat", { question: input });
      setResponse(res.data.answer);
      setDisplayedResponse(""); // Reset displayed response
      setCurrentWordIndex(0);  // Reset index for new response
    } catch (error) {
      setResponse("Sorry, I couldn't process your question. Please try again later.");
      setDisplayedResponse(""); // Handle error case
      setCurrentWordIndex(0);
    }
  };


  useEffect(() => {
    if (response) {
      const words = response.split(" ");
      if (currentWordIndex < words.length) {
        const timer = setTimeout(() => {
          setDisplayedResponse((prev) => (prev ? `${prev} ${words[currentWordIndex]}` : words[currentWordIndex]));
          setCurrentWordIndex((prev) => prev + 1);
        }, 100); // Adjust time interval as needed
        return () => clearTimeout(timer);
      }
    }
  }, [response, currentWordIndex]);


  const scrollToChat = () => {
    const chatSection = document.querySelector(".chat-button");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth" });
    }
  };




  return (
    <div className="App">

    <button className="scroll-button" onClick={scrollToChat}>
    <img 
      src={chatBot}
      alt="Arrow Animation" 
      className="scroll-image" 
    />
    <span>Ask?</span>
      </button>
  {/* Introduction Section */}
  <section id="introduction" className="section">
    <h1>Welcome to My Portfolio</h1>
    <img 
      src={photo}
      alt="Aditya Kumar" 
      className="profile-image"
      style={{ width: "150px", borderRadius: "50%" }} 
    />
    <p>
      Hello! I am <span style={{color:"red",fontSize:"bold"}}>Aditya Kumar</span>, a Computer Science and Engineering student at the National Institute of Technology, Patna, 
      with hands-on experience in developing innovative solutions. I am skilled in web development, AI-powered systems, and data-driven applications.
    </p>
  </section>

  {/* Skills Section */}
  <section id="skills" className="section">
    <h2>Skills</h2>
    <ul>
      <li>Programming Languages: C, C++, Python</li>
      <li>Web Development: React.js, Node.js, Express.js</li>
      <li>AI/ML: TensorFlow, AI Model Development</li>
      <li>Databases: MongoDB, SQL, AWS S3</li>
      <li>Cloud Platforms: AWS EC2, IAM</li>
      <li>Version Control: Git, GitHub</li>
    </ul>
  </section>

  {/* Resume Section */}
  <section id="resume" className="section">
  <h2>Resume Overview</h2>
  <p>
    I am a Computer Science student at National Institute of Technology Patna.<br />  
    - Key Projects: Coding Practice Tool, DeepFake Detection, Driver Drowsiness System.<br />  
    - Skills: ReactJS, NodeJS, Python, TensorFlow, MongoDB, AWS.<br />  
    - Internship: JavaScript and ReactJS from EiSystem.  
  </p>
  <a href="/Aditya_Resume.pdf" download className="button">
    Download Resume
  </a>
</section>


  {/* Contact Section */}
  <section id="contact" className="section">
    <h2>Contact Me</h2>
    <div className="contact-buttons">
      <a 
        href="https://www.linkedin.com/in/aditya-kumar-10a780257/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="button"
      >
        LinkedIn
      </a>
      <a 
        href="https://github.com/Adixshan" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="button"
      >
        GitHub
      </a>
      <a 
        href="mailto:adityak.ug21.cs@nitp.ac.in" 
        className="button"
      >
        Email Me
      </a>
    </div>
  </section>

  <main>
    <div className="chat-container">
      <input
        type="text"
        placeholder="Ask about my resume..."
        value={input}
        onChange={handleInput}
        className="chat-input"
      />
      <button onClick={handleSubmit} className="chat-button">
        Ask
      </button>
    </div>
    <div className="chat-response">{displayedResponse}</div>
  </main>
</div>
  );
}
export default App;