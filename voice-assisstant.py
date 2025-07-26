import speech_recognition as sr
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

# Initialize the recognizer
r = sr.Recognizer()

# Initialize the chatbot
chatbot = ChatBot('VoiceChatBot')

# Set up the trainer
trainer = ChatterBotCorpusTrainer(chatbot)

# Train the chatbot based on the English corpus
trainer.train('chatterbot.corpus.english')


# Function for processing voice commands
def process_command(command):
    response = chatbot.get_response(command)
    return str(response)


# Function for listening to voice commands
def listen():
    with sr.Microphone() as source:
        print("Listening...")
        audio = r.listen(source)

        try:
            command = r.recognize_google(audio)
            print(f"User said: {command}")
            bot_response = process_command(command)
            print('Bot Response:', bot_response)
        except sr.UnknownValueError:
            print("Could not understand audio. Please try again.")
        except sr.RequestError as e:
            print(f"Could not request results; {e}")


# Call the listen function to start listening for voice commands
listen()
