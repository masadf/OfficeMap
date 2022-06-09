# Интерактивная карта Нового Физтеха 

Проект направлен на разработку веб-приложения, на котором находится карта офисов [Нового Физтеха](https://physics.itmo.ru/ru). Приложение призвано упростить процесс рассадки сотрудников факультета по рабочим местам и отслеживания состояния рабочих мест (свободно/занято конкретным сотрудником). Также присутствует некоторая информация о сотруднике за рабочим местом (должность, email, ссылка на профиль сотрудника на сайт [Нового Физтеха](https://physics.itmo.ru/ru)).

## Основные задачи и степень их реализации
- Просмотр карты помещений и информации о сотрудниках (**реализовано**)
- Ссылки на информацию о сотрудниках на сайте [Нового Физтеха](https://physics.itmo.ru/ru) (**реализовано**)
- Авторизация администраторов на сайте (**реализовано**)
- Адаптивность (**реализовано**)

## Распределение ролей в команде
Савва Марьин - структура приложения на react, backend

Антон Ледров - backend, отрисовка карт в [geojson.io](http://geojson.io/#map=2/20.0/0.0)

Елизавета Чернышева - дизайн приложения в [Figma](https://www.figma.com/files/recent?fuid=1013871777027443973), отрисовка карт в  [geojson.io](http://geojson.io/#map=2/20.0/0.0)

Егор Прокофьев - backend

## Как пользоваться сайтом
Сама карта представляет собой несколько страниц плана факультета с офисами, в которых работают сотрудники Физтеха. Это 2 и 5 этажи второго корпуса на Ломоносова 9. В каждом офисе прямоугольниками обозначены столы - рабочие места сотрудников. На нашей карте можно просматривать, за каким столом какой сотрудник закреплен. 

![image_2022-06-09_21-23-30](https://user-images.githubusercontent.com/90752325/172917873-6a12ed8d-7a8f-422a-b341-374923c5af19.png)

Для этого нужно только нажать на определенный стол и сразу высветится окно с данными о сотруднике: 
- ФИО сотрудника
- Категория (преподаватель, аспирант и т.д.)
- Email для связи с сотрудником
- Ссылка на страницу физтеха, где находится полная информация о сотруднике (пример [Яна Музыченко](https://physics.itmo.ru/ru/personality/yana_muzychenko))

![image_2022-06-09_21-24-31](https://user-images.githubusercontent.com/90752325/172918091-fec2489c-58da-4e95-88b7-989d9a4953f2.png)


Есть также столы, за которыми в настоящий момент никто не закреплен. Все столы подсвечиваются различными цветами (о том, за какой категорией сотрудников какой цвет закреплен, описано в legend на самом сайте). Также, помимо офисов, на карте отмечены и конференц-зоны (переговорки). С ними пользователь сайта взаимодействовать не может, они отмечены как элементы архитектурного плана этажа. 
Таким образом, пользователь сайта может взаимодействовать с двумя основными страницами сайта - “Ломоносова” (план этажа второго корпуса) и “Церковь” (план этажа в здании церкви).

Сайт предназначен для двух видов пользователей - тех, кто может **только просматривать** карту офисов, и **администраторов**. 
Те, кто только просматривают сайт, могут только лишь просматривать информацию о том, за каким столом какой сотрудник закреплен, и не могут каким-либо образом изменять рассадку. 
Администратор видит сайт аналогичным образом, за исключением того, что ему доступна возможность редактировать карту, т.е. изменять рассадку сотрудников. Такой пользователь может:
- добавлять сотрудника на какое-либо место
- удалять сотрудника с закрепленного за ним места

Для добавления сотрудника необходимо нажать на свободное место, выбрать нужного сотрудника из всех работающих на данный момент на факультете и нажать кнопку "**Закрепить**". Для удаления сотрудника с рабочего места необходимо нажать на кнопку “**Открепить**”.

![1](https://user-images.githubusercontent.com/90752325/172918969-89eb0cf5-ccf6-4994-a1be-7bc012d80dc8.PNG)

![2](https://user-images.githubusercontent.com/90752325/172919046-c60753ab-9d48-4401-9863-266188ae377d.PNG)

![3](https://user-images.githubusercontent.com/90752325/172919095-1f2fc452-ec1f-49c9-b685-0bdb83783e5c.PNG)

![4](https://user-images.githubusercontent.com/90752325/172919144-ee844bb2-21ba-4dfa-8a0e-c221fafb4610.PNG)


Отдельная регистрация на сайт карты не требуется, она доступна всем зарегистрированным на [сайте Физтеха](https://physics.itmo.ru/ru) пользователям, однако вкладка “**Регистрация**” на сайте все же имеется. Но в любом случае и при входе, и при регистрации на сайте карты **необходимо ввести логин и пароль, использующиеся для сайта Физтеха**.


## Ссылка на сайт карты офисов
http://62.109.17.62:3000/
