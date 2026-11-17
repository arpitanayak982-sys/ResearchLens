    package com.researchlens.researchlens_backend;

    import java.sql.Connection;
    import java.sql.DriverManager;

    public class DatabaseTest {

        public static void main(String[] args) {

            String url = "jdbc:oracle:thin:@localhost:1521/XEPDB1";
            String username = "researchlens";
            String password = "ResearchLens@2026Db";
            try {
                Connection con = DriverManager.getConnection(url, username, password);

                System.out.println("Oracle Database Connected Successfully!");

                con.close();

            } catch (Exception e) {
                System.out.println("Connection Failed!");
                e.printStackTrace();
            }
        }
    }