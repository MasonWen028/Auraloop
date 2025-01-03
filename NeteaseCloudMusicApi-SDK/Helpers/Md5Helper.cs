﻿using System.Security.Cryptography;
using System.Text;


/// <summary>
/// handle md5
/// </summary>
public static class Md5Helper
{
    /// <summary>
    /// Calculates the MD5 hash of a given byte array.
    /// </summary>
    /// <param name="data">The byte array to hash.</param>
    /// <returns>The MD5 hash as a hexadecimal string.</returns>
    public static string CalculateMd5(byte[] data)
    {
        using (var md5 = MD5.Create())
        {
            byte[] hashBytes = md5.ComputeHash(data);
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();
        }
    }

    /// <summary>
    /// Calculates the MD5 hash of a given uploaded file.
    /// </summary>
    /// <param name="file">The file to hash.</param>
    /// <returns>The MD5 hash as a hexadecimal string.</returns>
    public static string CalculateMd5(IFormFile file)
    {
        byte[] data = ReadFileBytes(file);
        using (var md5 = MD5.Create())
        {
            byte[] hashBytes = md5.ComputeHash(data);
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();
        }
    }

    /// <summary>
    /// Calculates the MD5 hash of a file stream.
    /// </summary>
    /// <param name="stream">The file stream to hash.</param>
    /// <returns>The MD5 hash as a hexadecimal string.</returns>
    public static string CalculateMd5(Stream stream)
    {
        using (var md5 = MD5.Create())
        {
            byte[] hashBytes = md5.ComputeHash(stream);
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();
        }
    }

    /// <summary>
    /// convert iformfile to byte array
    /// </summary>
    /// <param name="file"></param>
    /// <returns></returns>
    public static byte[] ReadFileBytes(IFormFile file)
    {
        using (var memoryStream = new MemoryStream())
        {
            file.CopyTo(memoryStream);
            return memoryStream.ToArray();
        }
    }

    /// <summary>
    /// Generates the MD5 hash of a given string.
    /// </summary>
    /// <param name="input">The input string to hash.</param>
    /// <returns>The MD5 hash as a lowercase hexadecimal string.</returns>
    public static string CalculateMd5(this string input)
    {
        using (var md5 = System.Security.Cryptography.MD5.Create())
        {
            var inputBytes = System.Text.Encoding.UTF8.GetBytes(input);
            var hashBytes = md5.ComputeHash(inputBytes);
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
    }
}
