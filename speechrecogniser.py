import speech_recognition as sr
#import sys
r = sr.Recognizer()
exit_status = False     
with sr.Microphone() as source:
    print("Speak anything!")
    audio = r.listen(source)
    try:
        text = r.recognize_google(audio)
        print("You said: "+text)
    except:
        print("sorry! I didn't get you!!!")
            
            
            