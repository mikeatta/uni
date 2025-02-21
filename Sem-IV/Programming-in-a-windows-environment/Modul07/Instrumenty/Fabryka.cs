using System;

namespace Instrumenty
{
    public class Fabryka
    {
        public static Instrument Utworz(int i)
        {
            Instrument instr = null;

            switch (i)
            {
                case 1:
                    instr = new Instrument();
                    break;
                case 2:
                    instr = new Trabka();
                    break;
                case 3:
                    instr = new AdoptowanyBeben();
                    break;
            }

            return instr;
        }

        public static int Menu()
        {
            Console.Clear();
            Console.WriteLine("\n\t\t\t1 - Informacje ogólne o instrumentach");
            Console.WriteLine("\n\t\t\t2 - Informacje o trąbce");
            Console.WriteLine("\n\t\t\t3 - Informacje o bębnie");
            Console.WriteLine("\n\t\t\t0 - Koniec");

            int i;
            bool b;
            do
            {
                do
                {
                    b = int.TryParse(Console.ReadLine(), out i);
                } while (!b);
            } while (0 > i || i > 3);

            return i;
        }
    }
}