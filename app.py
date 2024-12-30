from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Resume Context (Replace with your resume content)
RESUME_CONTEXT = """
Aditya Kumar, a diligent and innovative Computer Science and Engineering undergraduate at the National Institute of Technology, Patna, is set to graduate in 2025 with a CGPA of 6.89 up to the 6th semester. Throughout his academic journey, he has demonstrated a strong foundation in core subjects such as Object-Oriented Programming, Database Management Systems, Computer Networks, and Operating Systems. Aditya’s expertise is reflected in several impactful projects that combine creativity and technical proficiency. In May 2024, he developed a Coding and Programming Practice Tool, a platform designed to enhance coding skills by providing users with an interactive code editor, real-time error detection, and solution analysis, utilizing technologies like ReactJS, NodeJS, MongoDB, and APIs. Earlier, in June 2023, he worked on a DeepFake Detection System, an AI-powered application that verifies the authenticity of images, leveraging ReactJS and NodeJS for a seamless user experience. In November 2023, he contributed to road safety with a Driver Drowsiness Detection System, a real-time monitoring tool that uses Python and APIs to detect driver fatigue and trigger alerts. Most recently, in January 2024, he developed a Rule-Based Chatbot using TensorFlow, Python, and ReactJS, designed for restaurant order-taking and basic conversational interaction, showcasing his expertise in natural language processing and scalable system design.

Aditya’s technical skill set includes proficiency in programming languages like C, C++, and Python, and familiarity with frameworks such as ReactJS, Django, ExpressJS, and TensorFlow. His experience extends to cloud platforms like AWS and databases like MongoDB and SQL, demonstrating his ability to handle complex software architectures. To gain real-world experience, he completed a two-month internship at EiSystem, specializing in JavaScript and ReactJS, where he worked on industry-relevant projects. His areas of interest include machine learning and deep learning models, aligning with his aspirations to create innovative AI-driven solutions. Beyond academics, Aditya is an avid sports enthusiast, actively participating in badminton and cricket, which reflect his dedication to a balanced lifestyle. As a member of the Ethickraft Club, he contributes to initiatives that promote ethical and social awareness. With a combination of technical prowess, practical experience, and extracurricular engagement, Aditya Kumar is poised to make meaningful contributions to the tech industry.
"""

# Groq Cloud API Configurations
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"  # Update as per Groq Cloud's documentation
GROQ_API_KEY = "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"  # Replace with your Groq Cloud API key

def query_groq_cloud(question, context):
    """
    Query the Groq Cloud LLM API with the question and resume context.
    """
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "llama3-70b-8192",  # Replace with your Groq model name
       "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Answer the question based on this resume: {context}\nQuestion: {question}"}
        ],
        "max_tokens": 150,
        "temperature": 0.7
    }
    
    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
       
        if response.status_code != 200:
          
            response.raise_for_status()
        answer= response.json().get("choices", [{}])[0].get("message", {}).get("content","").strip()
        print(f"Answer:{answer}")
        return answer
   
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

@app.route('/api/chat',methods=["POST"])
def chat():
    """
    Handle chat requests and return answers based on the resume context.
    """
    
    data = request.get_json()

    # Get the 'question' field from the JSON payload
    question = data.get("question", "No question provided")
    print(f"Received question: {question}")
    
    
    if not question: 
        return jsonify({"error": "Question is required"}), 400

    try:
        # Query the LLM with the resume context and question
        answer = query_groq_cloud(question, RESUME_CONTEXT)
        print(answer)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)

#return "heldjfkdsjfj----"