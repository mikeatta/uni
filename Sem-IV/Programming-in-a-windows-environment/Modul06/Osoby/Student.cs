namespace Osoby
{
    public class Student : Osoba
    {
        private readonly int _numerIndeksu;

        public int NumerIndeksu
        {
            get { return _numerIndeksu; }
        }

        public Student(string imie, string nazwisko, int rokUrodzenia,
            Plec plec, int numerIndeksu)
            : base(imie, nazwisko, rokUrodzenia, plec)
        {
            this._numerIndeksu = numerIndeksu;
        }

        public Student(Student student)
            : base(student.Imie, student.Nazwisko, student.RokUrodzenia,
                student.Plec)
        {
            _numerIndeksu = student._numerIndeksu;
        }

        public new string ZwrocInformacje()
        {
            return string.Format("{0} numer indeksu {1}",
                base.ZwrocInformacje(), _numerIndeksu);
        }
    }
}