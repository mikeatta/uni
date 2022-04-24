using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SearchAlgorithms.Tests;

[TestClass]
public class UnitTest1
{
    [TestMethod]
    public void TestMethod1()
    {
        int num1 = 7;
        int num2 = 13;
        int result = 20;
        Assert.IsTrue(num1 + num2 == result, "Test passed.");
    }
}