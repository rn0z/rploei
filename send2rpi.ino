#include <ESP8266WiFi.h>
#include <DHT.h> 
#include <WiFiUdp.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561_U.h>

#define LED D4
#define DHTPIN D5
#define CJMCUPIN A0

#define DHTTYPE DHT22

const char* ssid = "isolate_room";
const char* password = "00000000";

const char* ip = "192.168.1.39";
const unsigned int port = 8888;

WiFiUDP Udp;
char incomingPacket[255]{};
char replyPacket[255]{};
unsigned int localUdpPort = 8888;
DHT dht(DHTPIN, DHTTYPE);
Adafruit_TSL2561_Unified tsl = Adafruit_TSL2561_Unified(TSL2561_ADDR_FLOAT, 12345);
int sensorValue{}, offset{}; 
float Vout{}, P{};

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Udp.begin(localUdpPort);
  Wire.begin(D1, D2);
  dht.begin();
  tsl.begin();
  tsl.enableAutoRange(true);
  tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_402MS);
  pinMode(LED, OUTPUT); // shines LED until connecting and then blink
  
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED, HIGH);
    delay(250);
    digitalWrite(LED, LOW);
    delay(250);
    Serial.print(".");
  }
  Serial.println("connected");
  int sum{};
  for (int i = 0; i < 100; i++) {
    sensorValue = analogRead(CJMCUPIN) - 512;
    sum += sensorValue;
  }
  offset = sum / 100;
  Serial.printf("Now listening at IP %s, UDP port %d\n", WiFi.localIP().toString().c_str(), localUdpPort);
}



void loop() {
  sensors_event_t event;
  tsl.getEvent(&event);
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  sensorValue = analogRead(CJMCUPIN) - offset; 
  Vout = (5 * sensorValue) / 1024.0;
  P = (Vout - 2.5)*1000;
  
  
  sprintf(replyPacket ,"%.2f,%.2f,%.2f,%.2f", t, h, event.light, P);
  Serial.println(replyPacket);
  Serial.println(WiFi.localIP().toString().c_str());
  
  int packetSize = Udp.parsePacket();
  if (packetSize) {
    Serial.printf("Received %d bytes from %s, port %d\n", packetSize, ip, 8888);
    int len = Udp.read(incomingPacket, 255);
    if (len > 0) {
      incomingPacket[len] = 0;
    }
    if (strcmp(incomingPacket, "getData") == 0) {
      Udp.beginPacket(ip, port);
      Udp.write(replyPacket);
      Udp.endPacket();
      digitalWrite(LED, HIGH);
      delay(100);
      digitalWrite(LED, LOW);
      delay(150);
    }
  }

}
