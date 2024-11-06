import React, { useState } from 'react';
import { Text, View, Image, Alert, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const animalNames = [
  { name: 'Bee', image: require('./img/bee.jpg') },
  { name: 'Crocodile', image: require('./img/crocodile.jpg') },
  { name: 'Deer', image: require('./img/deer.jpg') },
  { name: 'Elephant', image: require('./img/elephant.jpg') },
  { name: 'Giraffe', image: require('./img/giraffe.jpg') },
  { name: 'Hummingbird', image: require('./img/hummingbird.jpg') },
  { name: 'Leopard', image: require('./img/leopard.jpg') },
  { name: 'Owl', image: require('./img/owl.jpg') },
  { name: 'Peacock', image: require('./img/peacock.jpg') },
  { name: 'Penguin', image: require('./img/penguin.jpg') },
  { name: 'Rabbit', image: require('./img/rabbit.jpg') },
  { name: 'Squirrel', image: require('./img/squirrel.jpg') },
  { name: 'Tiger', image: require('./img/tiger.jpg') },
  { name: 'Turtle', image: require('./img/turtle.jpg') },
  { name: 'Zebra', image: require('./img/zebra.jpg') },
];

const getRandomQuestions = (num) => {
  const selectedAnimals = [];
  while (selectedAnimals.length < num) {
    const randomIndex = Math.floor(Math.random() * animalNames.length);
    const animal = animalNames[randomIndex];

    if (!selectedAnimals.find(a => a.name === animal.name)) {
      selectedAnimals.push(animal);
    }
  }

  return selectedAnimals.map((animal) => {
    const options = [...animalNames]
        .filter(a => a.name !== animal.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)
        .map(a => ({ label: a.name, value: a.name }))
        .concat({ label: animal.name, value: animal.name });

    return {
      image: animal.image,
      options: options.sort(() => 0.5 - Math.random()),
      correctAnswer: animal.name,
    };
  });
};

export default function App() {
  const [questions, setQuestions] = useState(getRandomQuestions(3));
  const [answers, setAnswers] = useState(Array(3).fill(null));
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      // Alert if any question is unanswered
      Alert.alert(
          'Please answer all questions before submitting!',
          'It looks like you haven\'t answered all the questions yet.',
          [{ text: 'OK' }]
      );
    } else {
      let correctCount = 0;

      answers.forEach((answer, index) => {
        if (answer === questions[index].correctAnswer) {
          correctCount++;
        }
      });

      Alert.alert(
          `You got ${correctCount} out of ${questions.length} correct!`,
          'Would you like to retry the current quiz or start a new quiz?',
          [
            { text: 'Retry Quiz', onPress: () => setQuizFinished(false) },
            { text: 'New Quiz', onPress: resetQuiz },
          ]
      );

      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuestions(getRandomQuestions(3));
    setAnswers(Array(3).fill(null));
    setQuizFinished(false);
  };

  return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Animal Quiz</Text>
        </View>
        <View style={styles.quizContainer}>
          {questions.map((question, index) => (
              <View key={index} style={styles.questionContainer}>
                <Image source={question.image} style={styles.image} />
                <Text style={styles.questionText}>What animal is this?</Text>
                <RNPickerSelect
                    onValueChange={(value) => handleAnswerChange(index, value)}
                    items={question.options}
                    placeholder={{ label: 'Select an answer', value: null }}
                    style={pickerSelectStyles}
                    value={answers[index]}
                />
              </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={quizFinished}>
            <Text style={styles.buttonText}>Submit Answers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={resetQuiz}>
            <Text style={styles.buttonText}>Reset Quiz</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  titleContainer: {
    backgroundColor: '#f0f0f0', // Light grey background for header
    padding: 15,
    borderRadius: 8,
    elevation: 5, // Adds a shadow effect on Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  quizContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 5, // Adds a shadow effect on Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  questionContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: 'black',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: 'black',
    marginBottom: 20,
  },
});
