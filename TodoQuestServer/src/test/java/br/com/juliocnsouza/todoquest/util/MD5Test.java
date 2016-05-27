package br.com.juliocnsouza.todoquest.util;

import org.junit.Assert;

/**
 *
 * @author julio
 */
public class MD5Test {

    public MD5Test() {
    }

    @org.junit.Test
    public void testCrypt() {
        String value1 = "abc123456";
        String value2 = "abc123456";
        String value3 = "abd123457";
        Assert.assertEquals( value1 , value2 );
        Assert.assertNotEquals( value1 , value3 );
        Assert.assertNotEquals( value2 , value3 );
        Assert.assertEquals( MD5.crypt( value1 ) , MD5.crypt( value2 ) );
        Assert.assertNotEquals( MD5.crypt( value1 ) , MD5.crypt( value3 ) );
        Assert.assertNotEquals( MD5.crypt( value2 ) , MD5.crypt( value3 ) );
    }

}
