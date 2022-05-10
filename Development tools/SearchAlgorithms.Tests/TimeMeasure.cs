using System;

namespace SearchAlgorithms.Tests
{
    internal class TimeMeasure
    {
        public static void Main(string[] args)
        {
            int[] randomNumbers = new int[100000]; // Storing unsorted numbers
            Random random = new Random(); 

            for (int i = 0; i < 100000; i++) 
            {
                int randNum = random.Next(1, 5000); // Creating and assigning random numbers to array
                randomNumbers[i] = randNum;
            }
            
            for (int i = 0; i < 100000; i++)
            {
                Console.Write(randomNumbers[i] + ", ");
            }
        }
    }
}