#include "ESP8266WiFi.h"
#include "DHT.h"
#include "WiFiUdp.h"

#define SENSOR_PIN D1
#define LED D4

const char* ssid = "isolate_room";
const char* password = "00000000";

const char* ip = "192.168.1.34";
const unsigned int port = 8888;

WiFiUDP udp;
unsigned int localUDPPort = 8888;
char incomingPacket[255]{};
char replyPacket[255]{};

void setup(void) {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  udp.begin(localUDPPort);
  pinMode(LED, OUTPUT);
  pinMode(SENSOR_PIN, INPUT);

  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED, HIGH);
    delay(250);
    digitalWrite(LED, LOW);
    delay(250);
    Serial.print(".");
  }
  Serial.println("connected"); 
  Serial.printf("Now listening at IP %s, UDP port %d\n", WiFi.localIP().toString().c_str(), localUDPPort);
}
 
void loop(void) {
  int value = !digitalRead(SENSOR_PIN);
  sprintf(replyPacket ,"%d",value);
  Serial.println(replyPacket);
  Serial.println(WiFi.localIP().toString().c_str());
  
  int packetSize = udp.parsePacket();
  if (packetSize) {
    Serial.printf("Received %d bytes from %s, port %d\n", packetSize, ip, 8888);
    int len = udp.read(incomingPacket, 255);
    if (len > 0) {
      incomingPacket[len] = 0;
    }
    if (strcmp(incomingPacket, "getData") == 0) {
      udp.beginPacket(ip, port);
      udp.write(replyPacket);
      udp.endPacket();
      digitalWrite(LED, HIGH);
      delay(100);
      digitalWrite(LED, LOW);
      delay(150);
    }
  }
}