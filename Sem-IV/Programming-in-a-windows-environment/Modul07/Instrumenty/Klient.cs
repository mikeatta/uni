using System;

namespace Instrumenty
{
    public class Klient
    {
        private Instrument _instrument;

        public int Menu()
        {
            Console.Clear();
            Console.WriteLine("Twój aktualny wybór to {0}\n", _instrument);
            Console.WriteLine("\n\t\t\t1 - Przykładowe dźwięki wydawane " +
                              "przez instrument");
            Console.WriteLine("\n\t\t\t2 - Krótka charakterystyka instrumentu");
            Console.WriteLine("\n\t\t\t3 - Powrót do menu głównego");

            int i;
            bool b;
            do
            {
                b = int.TryParse(Console.ReadLine(), out i);
            } while (!b);

            return i;
        }

        public void Uruchom()
        {
            int i, j;
            while (true)
            {
                i = Fabryka.Menu();
                if (i == 0)
                    break;

                _instrument = Fabryka.Utworz(i);
                do
                {
                    j = Menu();
                    Console.Clear();
                    switch (j)
                    {
                        case 1:
                            _instrument.Graj();
                            Console.ReadKey();
                            break;
                        case 2:
                            Console.WriteLine(_instrument.Opis);
                            Console.ReadKey();
                            break;
                    }
                } while (j != 3);
            }
        }
    }
}