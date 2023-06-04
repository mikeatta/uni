using System;
using InstumentyPerkusyjne;

namespace Instrumenty
{
    public class AdoptowanyBeben : Instrument
    {
        private Beben _beben = new Beben();

        public override void Graj()
        {
            Console.WriteLine(_beben.Uderz());
        }

        public override string Opis
        {
            get { return _beben.ZwrocOpis(); }
        }

        public override string ToString()
        {
            return "bęben";
        }
    }
}