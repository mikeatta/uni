using System;
using Listy;

namespace TestListy
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            Listy.Lista imiona = new Listy.Lista();
            imiona.DodajDoGlowy("Ania");
            imiona.DodajDoGlowy("Agnieszka");
            imiona.DodajDoGlowy("Wiktoria");
            imiona.DodajDoGlowy("Kasia");

            for (int i = 0; i < imiona.PobierzLiczbeElementow(); i++)
            {
                Console.WriteLine($"{i} : {imiona[i]}");
            }
            
            Console.WriteLine("\n************\n");
            Console.ReadKey();

            imiona[1] = "Basia";
            imiona[3] = "Ola";

            for (int i = 0; i < imiona.PobierzLiczbeElementow(); i++)
            {
                Console.WriteLine($"{i} : {imiona[i]}");
            }

            Console.ReadKey();
        }
    }
}