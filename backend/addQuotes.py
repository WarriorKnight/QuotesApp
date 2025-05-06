from pymongo import MongoClient
from bson.objectid import ObjectId

# Import the QuoteList
from quotes_data import QuoteList  # Ensure this file is in the same directory or adjust the import path

# MongoDB connection
client = MongoClient("mongodb+srv://vojtba:Vojtba2004@nesttest.wbgtnud.mongodb.net/?retryWrites=true&w=majority&appName=NestTest")
db = client["test"]  # Replace with your database name
authors_collection = db["authors"]  # Replace with your authors collection name
quotes_collection = db["quotes"]  # Replace with your quotes collection name

def clear_database():
    authors_collection.delete_many({})  # Clear all authors
    quotes_collection.delete_many({})   # Clear all quotes
    print("Database cleared: all authors and quotes removed.")

QuoteList = [
    {
        "quote": "Kids, you tried your best and you failed miserably. The lesson is, never try ...",
        "author": "Homer Simpson"
    },
    {
        "quote": "You are a background character in a much more interesting person's story. ",
        "author": "Anonymous"
    },
    {
        "quote": "We're all going to die, and aside from the extremely rare chance that you'll do anything notable enough in your life, you will inevitably be forgotten, as life, the world, the universe, and everything is just a series of processes. ",
        "author": "Anonymous"
    },
    {
        "quote": "The early worm gets eaten. ",
        "author": "Anonymous"
    },
    {
        "quote": "The squeaky wheel gets replaced.",
        "author": "Anonymous"
    },
    {
        "quote": "Hope is the first step on the road to disappointment. ",
        "author": "Anonymous"
    },
    {
        "quote": "Just remember, you're unique. Just like everybody else.",
        "author": "Anonymous"
    },
        {
        "quote": "Success is just failure that hasn't happened yet.",
        "author": "Latrell Sprewell"
    },
        {
        "quote": "Hard work pays off eventually, but laziness pays off now.",
        "author": "Anonymous"
    },
        {
        "quote": "I guess one person can make a difference, but most of the time, they probably shouldn't.",
        "author": "Marge Simpson "
    },
        {
        "quote": "Just because you are unique doesn’t mean you are useful.",
        "author": "Anonymous"
    },
        {
        "quote": "Every frozen corpse on the slopes of Mt. Everest started out as a highly motivated person.",
        "author": "Anonymous"
    },
        {
        "quote": "Nobody exists on purpose, nobody belongs anywhere, everybody's gonna die. Come watch TV.",
        "author": "Morty"
    },
        {
        "quote": "Life sucks, and then you die.",
        "author": "Spongebob Squarepants"
    },
        {
        "quote": "Someone better looking, dumber than you, and more sociable will do the exact same thing and reap the praise and reward.",
        "author": "Anonymous"
    },
    {
        "id": 1,
        "quote": "Trying is the first step toward failure.",
        "author": "Homer Simpson"
    },
    {
        "id": 2,
        "quote": "Not everything is a lesson. Sometimes you just fail.",
        "author": "Dwight Schrute"
    },
    {
        "id": 3,
        "quote": "Always remember that you are absolutely unique. Just like everyone else.",
        "author": "Margaret Mead"
    },
    {
        "id": 4,
        "quote": "If at first you don't succeed, try, try again. Then quit. No use being a damn fool about it.",
        "author": "W. C. Fields"
    },
    {
        "id": 5,
        "quote": "It could be that your purpose in life is to serve as a warning to others.",
        "author": "Ashleigh Brilliant"
    },
    {
        "id": 6,
        "quote": "Those who doubt your ability probably have a valid reason.",
        "author": "unknown"
    },
    {
        "id": 7,
        "quote": "“The best things in life are actually really expensive.”",
        "author": "unknown"
    },
    {
        "id": 8,
        "quote": "Just imagine how terrible it might have been if we’d been at all competent.",
        "author": "Terry Pratchett"
    },
    {
        "id": 9,
        "quote": "I’ve developed a new philosophy. I only dread one day at a time.",
        "author": "Charles M. Schulz"
    },
    {
        "id": 10,
        "quote": "Hope is the first step on the road to disappointment.",
        "author": "Cassern S. Goto"
    },
    {
        "id": 11,
        "quote": "“Everything happens for a reason. Sometimes the reason is you're stupid and make bad decisions.",
        "author": "Marion G. Harmon"
    },
    {
        "id": 12,
        "quote": "Everyone has a purpose in life. Perhaps yours is watching television.",
        "author": "David Letterman"
    },
    {
        "id": 13,
        "quote": "Your life can’t fall apart if you never had it together.",
        "author": "Anonymus"
    },
    {
        "id": 14,
        "quote": "The worst part of success is trying to find someone who is happy for you.",
        "author": "Bette Midler"
    },
    {
        "id": 15,
        "quote": "The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.",
        "author": "Terry Pratchett"
    },
    {
        "id": 16,
        "quote": "The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.",
        "author": "Terry Pratchett"
    },
    {
        "id": 17,
        "quote": "Those who doubt your ability probably have a valid reason.",
        "author": "Anonymus"
    },
    {
        "id": 18,
        "quote": "Change is not a four letter word… but often your reaction to it is!",
        "author": "Jeffrey Gitomer"
    },
    {
        "id": 19,
        "quote": "I always wanted to be somebody, but now I realize I should have been more specific.",
        "author": "Lily Tomlin"
    },
    {
        "id": 20,
        "quote": "People say nothing is impossible, but I do nothing every day.",
        "author": "Winnie the Pooh"
    },
    {
        "id": 21,
        "quote": "By working faithfully eight hours a day you may eventually get to be boss and work twelve hours a day.",
        "author": "Robert Frost"
    },
    {
        "id": 22,
        "quote": "There are no stupid questions, but there are a LOT of inquisitive idiots.",
        "author": "Justin Sewell"
    },
    {
        "id": 23,
        "quote": "You can be replaced.",
        "author": "God"
    },
    {
        "id": 24,
        "quote": "Step out of your comfort zone and then step back in immediately and appreciate how nice and comfy it is.",
        "author": "Anonymus"
    },
    {
        "id": 25,
        "quote": "Dream is the only way for you to escape the miserable reality of your life.",
        "author": "Anonymus"
    },
    {
        "id": 26,
        "quote": "If at first you don't succeed, Give up and try something else.",
        "author": "Anonymus"
    },
    {
        "id": 27,
        "quote": "Always believe that something wonderful will probably never happen.",
        "author": "Anonymus"
    },
    {
        "id": 28,
        "quote": "Always remember you’re someone’s reason to smile because you’re a joke.",
        "author": "Anonymus"
    },
    {
        "id": 29,
        "quote": "Dream Big, Set Goals. Write goals on a nice paper and never look at them again.",
        "author": "Some Guy"
    },
    
]

def add_quotes_to_db():
    for quote_data in QuoteList:
        author_name = quote_data["author"]
        quote_text = quote_data["quote"]

        # Check if the author already exists
        author = authors_collection.find_one({"name": author_name})
        if not author:
            # Add the author if they don't exist
            author_id = authors_collection.insert_one({"name": author_name}).inserted_id
            print(f"Added new author: {author_name} (ID: {author_id})")
        else:
            author_id = author["_id"]

        # Check if the quote already exists
        existing_quote = quotes_collection.find_one({"text": quote_text, "author": ObjectId(author_id)})
        if not existing_quote:
            # Add the quote if it doesn't exist
            quotes_collection.insert_one({"text": quote_text, "author": ObjectId(author_id)})
            print(f"Added new quote: \"{quote_text}\" by {author_name}")
        else:
            print(f"Quote already exists: \"{quote_text}\" by {author_name}")

if __name__ == "__main__":
    clear_database()
    add_quotes_to_db()