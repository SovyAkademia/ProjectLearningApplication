package sample.Objects;

public class MyTimeDate {
    private int year;
    private int month;
    private int day;
    private int hour;
    private int minute;
    private int second;

    public MyTimeDate(String response) {
        String[] swap = response.split("@");
        String[] date = swap[0].trim().split("/");
        String[] time = swap[1].trim().split(":");
        this.year = Integer.parseInt(date[2]);
        this.month = Integer.parseInt(date[1]);
        this.day = Integer.parseInt(date[0]);
        this.hour = Integer.parseInt(time[0]);
        this.minute = Integer.parseInt(time[1]);
        this.second = Integer.parseInt(time[2]);
    }

    public void printTime(){
        System.out.println(this.hour+this.minute+this.second);
    };

    public void printDate(){
        System.out.println(this.year+this.month+this.day);
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public int getMinute() {
        return minute;
    }

    public void setMinute(int minute) {
        this.minute = minute;
    }

    public int getSecond() {
        return second;
    }

    public void setSecond(int second) {
        this.second = second;
    }
}
