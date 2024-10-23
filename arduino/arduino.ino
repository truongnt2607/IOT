#include <DHT.h>
#include <ESP8266WiFi.h>
#include <Ticker.h>
#include <AsyncMqttClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

// Cấu hình WiFi và MQTT
#define WIFI_SSID "Tai Khoan Giong Mat Khau"  // Tên của Wifi 
#define WIFI_PASSWORD "mkgiongtk"  // Mật khẩu của Wifi 19218854
#define MQTT_HOST IPAddress(192, 168, 240, 50)  // Địa chỉ IP của MQTT broker
#define MQTT_PORT 1893  // POST của mosquitto
#define MQTT_USERNAME "Nguyen_Trong_Truong" // Tài khoản mosquitto
#define MQTT_PASSWORD "B21DCCN740"  // Mật khẩu mosquitto
#define MQTT_TOPIC "data_sensor"  // Topic mosquitto
#define MQTT_TOPIC_2 "control_led"  // Topic mosquitto

// Cấu hình các cảm biến và bóng đèn
#define DHTPIN D4        // Chân kết nối DHT11
#define DHTTYPE DHT11    // Loại cảm biến DHT11
#define LED_PIN1 D5       // Thiết lập chân D5 làm đầu ra
#define LED_PIN2 D6       // Thiết lập chân D6 làm đầu ra
#define LED_PIN3 D7       // Thiết lập chân D7 làm đầu ra
#define LED_PIN4 D2       // Thiết lập chân D2 làm đầu ra
#define LIGHT_SENSOR_PIN A0  // Chân kết nối cảm biến ánh sáng (AO)

DHT dht(DHTPIN, DHTTYPE);
AsyncMqttClient mqttClient;
Ticker mqttReconnectTimer;
Ticker wifiReconnectTimer;
WiFiEventHandler wifiConnectHandler;
WiFiEventHandler wifiDisconnectHandler;


// Hàm để kết nối lại WiFi
void connectToWifi() {
  Serial.println("Kết nối WiFi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}

// Hàm để kết nối lại MQTT
void connectToMqtt() {
  Serial.println("Kết nối MQTT...");
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
  mqttClient.setCredentials(MQTT_USERNAME, MQTT_PASSWORD);
  mqttClient.connect();
}

// Hàm khi kết nối WiFi thành công
void onWifiConnect(const WiFiEventStationModeGotIP& event) {
  Serial.println("Đã kết nối WiFi.");
  Serial.print("Địa chỉ IP: ");
  Serial.println(WiFi.localIP());
  connectToMqtt();
}

// Hàm khi mất kết nối WiFi
void onWifiDisconnect(const WiFiEventStationModeDisconnected& event) {
  Serial.println("Mất kết nối WiFi.");
  mqttReconnectTimer.detach();  // Dừng kết nối lại MQTT
  wifiReconnectTimer.once(2, connectToWifi);  // Kết nối lại WiFi sau 2s
}

// Hàm khi kết nối MQTT thành công
void onMqttConnect(bool sessionPresent) {
  Serial.println("Đã kết nối MQTT.");
  mqttClient.subscribe(MQTT_TOPIC_2, 2);  // Đăng ký lắng nghe topic bật/tắt LED
  Serial.println("Đang lắng nghe topic: control_led.");
}

// Hàm khi mất kết nối MQTT
void onMqttDisconnect(AsyncMqttClientDisconnectReason reason) {
  Serial.println("Mất kết nối MQTT.");
  if (WiFi.isConnected()) {
    mqttReconnectTimer.once(2, connectToMqtt);  // Kết nối lại MQTT sau 2s
  }
}

// 
void onMqttMessage(char* topic, char* payload, AsyncMqttClientMessageProperties properties, size_t len, size_t index, size_t total) {
  Serial.print("Received message on topic: ");
  Serial.println(topic);

  // Kiểm tra nội dung thông báo
  String message;
  for (int i = 0; i < len; i++) {
    message += (char)payload[i];
  }
  Serial.print("Message: ");
  Serial.println(message);

  // Parse JSON từ message
  StaticJsonDocument<256> doc;
  DeserializationError error = deserializeJson(doc, message);
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }

    if(doc["device"] == "Air Conditioner"){
      digitalWrite(LED_PIN1, doc["action"] == "On" ? HIGH : LOW);
    }
    if(doc["device"] == "Fan"){
      digitalWrite(LED_PIN2, doc["action"] == "On" ? HIGH : LOW);
    }
    if(doc["device"] == "Refrigerator"){
      digitalWrite(LED_PIN3, doc["action"] == "On" ? HIGH : LOW);
    }
    if(doc["device"] == "Light"){
      digitalWrite(LED_PIN4, doc["action"] == "On" ? HIGH : LOW);
    }
}


// Hàm để publish dữ liệu cảm biến
void publishSensorData() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int lightSensorValue = (1023 - analogRead(LIGHT_SENSOR_PIN))*10;
  int dust = random(0, 101);

  // Kiểm tra xem dữ liệu DHT11 có hợp lệ không
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Không đọc được dữ liệu từ cảm biến DHT11.");
    return;
  }

  // Chuẩn bị dữ liệu để publish
  String payload = String("{\"temperature\":") + String(temperature) + 
                   String(",\"humidity\":") + String(humidity) + 
                   String(",\"light\":") + String(lightSensorValue) +
                   String(",\"dust\":") + String(dust)  +  String("}");
  // Gửi dữ liệu lên Server bằng API
  char jsonData[512];
  StaticJsonDocument<200> doc;
  doc["temperature"] = temperature;
  doc["humidity"] = humidity;
  doc["light"] = lightSensorValue;
  doc["dust"] = dust;
  serializeJson(doc, jsonData);
  
  // HTTPClient http;
  // WiFiClient wifiClient;
  // http.begin(wifiClient, "http://192.168.0.102:8080/api/sensor");
  // http.addHeader("Content-Type", "application/json");
  // int httpCode = http.POST(jsonData);
  // http.end();
  // Pushlish dữ liệu lên topic
  if(mqttClient.publish(MQTT_TOPIC, 0, false, jsonData)) {
  Serial.print("Dữ liệu đã publish: ");
  Serial.println(payload);
    if(dust >= 70) {
      for (int i = 1; i <= 10; i++) {
        digitalWrite(LED_PIN4, HIGH);  // Bật đèn LED
        delay(300);
        digitalWrite(LED_PIN4, LOW);  // Bật đèn LED
        delay(300);
      }
    }
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();
  wifiConnectHandler = WiFi.onStationModeGotIP(onWifiConnect);
  wifiDisconnectHandler = WiFi.onStationModeDisconnected(onWifiDisconnect);

  // Thiết lập MQTT
  mqttClient.onMessage(onMqttMessage);
  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);

  // Kết nối WiFi
  connectToWifi();
  pinMode(LIGHT_SENSOR_PIN, INPUT);
  pinMode(LED_PIN1, OUTPUT);  // Thiết lập chân D5 làm đầu ra
  pinMode(LED_PIN2, OUTPUT);  // Thiết lập chân D6 làm đầu ra
  pinMode(LED_PIN3, OUTPUT);  // Thiết lập chân D7 làm đầu ra
  pinMode(LED_PIN4, OUTPUT);  // Thiết lập chân D2 làm đầu ra
  digitalWrite(LED_PIN1, LOW);  // Bật đèn LED
  digitalWrite(LED_PIN2, LOW);  // Bật đèn LED
  digitalWrite(LED_PIN3, LOW);  // Bật đèn LED
  digitalWrite(LED_PIN4, LOW);  // Bật đèn LED
}

void loop() {
  // Đo và publish dữ liệu mỗi 10 giây
  static unsigned long lastMillis = 0;
  if (millis() - lastMillis > 8000) {
    lastMillis = millis();
    publishSensorData();
  }
}
