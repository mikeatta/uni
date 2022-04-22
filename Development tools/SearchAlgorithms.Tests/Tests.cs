using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;

namespace SearchAlgorithms.Tests
{
    [TestFixture]
    public class Tests
    {
        [Test]
        public void Test1()
        {
            int varOne = 50;
            int varTwo = 50;
            int expResult = 100;
            
            Assert.IsTrue(varOne + varTwo == expResult, "Should be true.");
            Assert.IsTrue(varOne + varTwo == expResult+1, "Should be false.");
        }
    }
}