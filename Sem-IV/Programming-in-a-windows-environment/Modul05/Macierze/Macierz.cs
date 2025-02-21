using System;

namespace Macierze
{
    public class Macierz
    {
        private double[,] macierz;

        public Macierz(int liczbaWierszy, int liczbaKolumn)
        {
            macierz = new double[liczbaWierszy, liczbaKolumn];
        }

        public double this[int wiersz, int kolumna]
        {
            set { macierz[wiersz - 1, kolumna - 1] = value; }
            get { return macierz[wiersz - 1, kolumna - 1]; }
        }

        public int LiczbaWierszy
        {
            get { return macierz.GetLength(0); }
        }

        public int LiczbaKolumn
        {
            get { return macierz.GetLength(1); }
        }

        public static Macierz operator +(Macierz a, Macierz b)
        {
            if (a.LiczbaWierszy != b.LiczbaWierszy ||
                a.LiczbaKolumn != b.LiczbaKolumn)
            {
                throw new ArgumentException("Incorrect matrix size");
            }

            Macierz c = new Macierz(a.LiczbaWierszy, a.LiczbaKolumn);

            for (int i = 0; i < a.LiczbaWierszy; i++)
            {
                for (int j = 0; j < a.LiczbaKolumn; j++)
                {
                    c.macierz[i, j] = a.macierz[i, j] + b.macierz[i, j];
                }
            }

            return c;
        }

        public static Macierz operator -(Macierz a, Macierz b)
        {
            if (a.LiczbaWierszy != b.LiczbaWierszy ||
                a.LiczbaKolumn != b.LiczbaKolumn)
            {
                throw new ArgumentException("Incorrect matrix size");
            }

            Macierz c = new Macierz(a.LiczbaWierszy, a.LiczbaKolumn);

            for (int i = 0; i < a.LiczbaWierszy; i++)
            {
                for (int j = 0; j < a.LiczbaKolumn; j++)
                {
                    c.macierz[i, j] = a.macierz[i, j] - b.macierz[i, j];
                }
            }

            return c;
        }

        public static Macierz operator *(Macierz a, Macierz b)
        {
            if (a.LiczbaKolumn != b.LiczbaWierszy)
            {
                throw new ArgumentException("Incorrect matrix size");
            }

            Macierz c = new Macierz(a.LiczbaWierszy, a.LiczbaKolumn);

            for (int i = 0; i < a.LiczbaWierszy; i++)
            {
                for (int j = 0; j < b.LiczbaKolumn; j++)
                {
                    c.macierz[i, j] = 0;
                    for (int k = 0; k < b.LiczbaWierszy; k++)
                    {
                        c.macierz[i, j] += a.macierz[i, k] * b.macierz[k, j];
                    }
                }
            }

            return c;
        }

        public static Macierz operator *(double x, Macierz a)
        {
            Macierz c = new Macierz(a.LiczbaWierszy, a.LiczbaKolumn);

            for (int i = 0; i < a.LiczbaWierszy; i++)
            {
                for (int j = 0; j < a.LiczbaKolumn; j++)
                {
                    c.macierz[i, j] = x * a.macierz[i, j];
                }
            }

            return c;
        }

        public static explicit operator Macierz(double x)
        {
            Macierz c = new Macierz(1, 1);
            c.macierz[0, 0] = x;
            return c;
        }
    }
}