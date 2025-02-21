using System;

namespace Instrumenty
{
    public class Instrument
    {
        public virtual void Graj()
        {
            Console.WriteLine("Instrumenty wydają dźwięki o różnej " +
                              "częstotliwości i barwie...");
        }

        public virtual string Opis
        {
            get { return "Instrument muzyczny - przyrząd wytwarzający dźwięk"; }
        }

        public override string ToString()
        {
            return "instrument";
        }
    }
}