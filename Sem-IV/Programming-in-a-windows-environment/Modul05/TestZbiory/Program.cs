using System;
using Zbiory;

namespace TestZbiory
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            ZbiorNapisow a = new ZbiorNapisow();
            a.DodajElement("kot");
            a.DodajElement("pies");
            a.DodajElement("koza");

            ZbiorNapisow b = new ZbiorNapisow();
            b.DodajElement("krowa");
            b.DodajElement("owca");
            b.DodajElement("koza");
            
            Console.Write("Zbior A:={ ");
            for (int i = 0; i < a.MocZbioru; i++)
            {
                Console.Write("{0} ", a[i]);
            }
            Console.WriteLine("}");
            
            Console.Write("Zbior B:={ ");
            for (int i = 0; i < b.MocZbioru; i++)
            {
                Console.Write("{0} ", b[i]);
            }
            Console.WriteLine("}");

            ZbiorNapisow c = a + b;
            Console.Write("Zbior A+B:={ ");
            for (int i = 0; i < c.MocZbioru; i++)
            {
                Console.Write("{0} ", c[i]);
            }
            Console.WriteLine("}");

            c = a - b;
            Console.Write("Zbior A-B:={ ");
            for (int i = 0; i < c.MocZbioru; i++)
            {
                Console.Write("{0} ", c[i]);
            }
            Console.WriteLine("}");

            c = a * b;
            Console.Write("Zbior A*B:={ ");
            for (int i = 0; i < c.MocZbioru; i++)
            {
                Console.Write("{0} ", c[i]);
            }
            Console.WriteLine("}");

            Console.ReadKey();
        }
    }
}