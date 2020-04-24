# 朗国SDK接口文档

更新时间<!-- -->：<!-- -->2020-04-05 18:08:00

**版本及修改记录**

| **版本** | **描述** | **日期** |
| --- | --- | --- |
| V1.0 | 创建 | 2019-06-29 |
|   |   |   |


### 一、重启

| action | 参数 |
| --- | --- |
| android.intent.action.reboot | 无 |

示例：

```
Intent intent = new Intent();
setAction("android.intent.action.reboot");
sendBroadcast(intent);
```


### 二、关机

| action | 参数 |
| --- | --- |
| android.intent.action.shutdown | 无 |

示例：

```
Intent intent = new Intent();
setAction("android.intent.action.shutdown");
sendBroadcast(intent);
```


### 三、休眠（关闭屏幕背光）

| action | 参数 |
| --- | --- |
| android.intent.action.gotosleep | 无 |

示例：

```
Intent intent = new Intent();
setAction("android.intent.action.gotosleep");
sendBroadcast(intent);
```


### 四、唤醒休眠（打开屏幕背光）

| action | 参数 |
| --- | --- |
| android.intent.action.exitsleep | 无 |

示例：

```
Intent intent = new Intent();
setAction("android.intent.action.exitsleep");
sendBroadcast(intent);
```


### 五、屏幕旋转

| action | 参数 | 备注 |
| --- | --- | --- |
| android.intent.rotation\_0 | 无 | 旋转角度为0 |
| android.intent.rotation\_90 | 无 | 旋转角度为90 |
| android.intent.rotation\_180 | 无 | 旋转角度为180 |
| android.intent.rotation\_270 | 无 | 旋转角度为270 |

示例：

```
Intent intent = new Intent();
setAction("android.intent.rotation_0");
sendBroadcast(intent);
```


### 六、APP静默安装

| action | 参数 |
| --- | --- |
| com.android.lango.installapp | apppath ( 需要安装apk的绝对路径) |

示例：

```
Intent intent = new Intent();
setAction("com.android.lango.installapp");
putExtra("apppath", "/sdcard/xxx.apk");
sendBroadcast(intent);
```


### 七、关闭第三方应用

| action | 参数 |
| --- | --- |
| com.android.lango.killapp | packagename ( 需要关闭的应用的包名) |

示例：

```
Intent intent =  **new**  Intent();
setAction("com.android.lango.killapp");
putExtra("packagename", "com.xxxx.demo");
sendBroadcast(intent);
```


### 八、定时开关机

| action | 参数 |
| --- | --- |
| android.intent.action.setpoweronoff | timeon ( 开机时间，int数组，如int[] timeonArray = {2014, 10, 1, 8, 30};//下次开机具体日期时间，即在2014.10.1 8:30开机 ) |
| | timeoff ( 关机时间，int数组，如int[] timeoffArray = {2014, 9, 1, 8, 30};//下次关机具体日期时间，即在2014.9.1 8:30关机 ) |
| | enable ( 使能开关机功能，true开启，false关闭 ) |

示例：

```
Intent intent = new Intent();
int [] timeonArray = {2014, 10, 1, 8, 30};
int [] timeoffArray = {2014, 9, 1, 8, 30};
putExtra("timeon", timeonArray);
putExtra("timeoff", timeoffArray);
putExtra("enable", true);
sendBroadcast(intent);
```


### 九、系统时间设置（同步硬件时钟）

| action | 参数 |
| --- | --- |
| com.android.lango.setsystemtime | time ( 时间戳，单位ms, String类型) |

示例：

```
Intent intent = new Intent();
Calendar c = Calendar.getInstance();
putExtra("time", String.valueOf(c.getTimeInMillis()));
sendBroadcast(intent);
```


### 十、截屏

| action | 参数 | 备注 |
| --- | --- | --- |
| android.intent.action.screencap | 无 | 截图保存路径：外置存储根目录的screenshot.png（既：_Environment.getExternalStorageDirectory().getAbsolutePath()+"/screenshot.png"_） |

示例：

```
Intent intent = new Intent();
setAction("android.intent.action.screencap");
sendBroadcast(intent);
```
