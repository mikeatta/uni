using System;

namespace Instrumenty
{
    public class Trabka : Instrument
    {
        public override void Graj()
        {
            Console.WriteLine("Tra ta ta ta");
        }

        public override string Opis
        {
            get { return "Trąbka jest to instrument dęty blaszany..."; }
        }

        public override string ToString()
        {
            return "trąbka";
        }
    }
}