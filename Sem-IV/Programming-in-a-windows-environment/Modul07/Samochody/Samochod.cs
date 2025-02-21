using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Samochody
{
    public class Silnik
    {
        private double pojemnosc;
        public double Pojemnosc
        {
            get { return pojemnosc; }
        }
        private  readonly int numerFabryczny;
        public int NumerFabryczny
        {
            get { return numerFabryczny; }
        }
        public Silnik(double pojemnosc, int numerFabryczny)
        {
            this.numerFabryczny = numerFabryczny;
            this.pojemnosc = pojemnosc;
        }
    }

    public class Osoba
    {
        public string Nazwisko { set; get; }
        public string Imie { set; get; }
    }

    public class Samochod
    {
        public Osoba Wlasciciel { set; get; }

        private readonly int rokProdukcji;
        public int RokProdukcji
        {
            get { return rokProdukcji; }
        }

        private  readonly string marka;
        public string Marka
        {
            get { return marka; }
        }

        private readonly string model;
        public string Model
        {
            get { return model; }
        }

        public Silnik Silnik { set; get; }

        public Samochod(Osoba wlasciciel, int rokProdukcji, string marka,
            string producent, Silnik silnik)
        {
            Wlasciciel = wlasciciel;
            this.rokProdukcji = rokProdukcji;
            this.marka = marka;
            this.model = producent;
            Silnik = silnik;
        }

        public override string ToString()
        {
            return String.Format("{0} {1} rok produkcji: {2}; pojemność " +
                                 "silnika: {3}; numer silnika: {4}; " +
                                 "właściciel: {5} {6}", Model, Marka,
                RokProdukcji, Silnik.Pojemnosc, Silnik.NumerFabryczny,
                Wlasciciel.Imie, Wlasciciel.Nazwisko);
        }

        public override bool Equals(object obj)
        {
            if (obj == null) return false;
            if (this.GetType() != obj.GetType()) return false;
            Samochod s = (Samochod)obj;
            if (RokProdukcji != s.RokProdukcji) return false;
            if (!string.Equals(Model, s.Model)) return false;
            if (!string.Equals(Marka, s.Marka)) return false;
            if (!object.Equals(Silnik, s.Silnik)) return false;
            return true;
        }

        public override int GetHashCode()
        {
            return string.Format("{0} {1} {2} {3} {4}", Model, Marka, RokProdukcji,
                Silnik.NumerFabryczny, Silnik.Pojemnosc).GetHashCode();
        }
    }
}
