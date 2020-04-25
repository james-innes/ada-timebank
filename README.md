Community Timebank
James Innes

The app is set to automatically deploy on Heroku:
https://community-time-bank.herokuapp.com/


I had written a nice detailed explanation for a lot of choices and learnings form the project but it got lost in version control having had it in git ignore hence the spelling mistakes here

I would like to knowledge a couple of things that I would do differently given more time and therfor hopefully ovoid loosing marks for them

Having spent a lot of time with naming conventions at work I ended up implementing a lot of different naming styles over the project so its become quite nonsensical

Havin spoken to some of the senior devs I understand there are several different ways of achiving the ranking table

The business business logic of solution should be constricted to one layer which is where the proper programming language is implemented so JS not SQL. I found it quite confusing at first for where the stats logic should go for the ranking table. Its very easy to implemnetd in SQL as I have done as it’s a database module but I realiase the this is bad practise for the following reasons. The buiness logic should be in one layer so it can be found and better maintained. Should be written using a proper language where there won’t be any restrcitions as one may find with SQL. A level of abstraction between lyers should be maintained so that for example if we wanted to change the database system we would only have to update the mappig layer. Instead with my implementation of the ranking table the JS class or model would have to be complety changed. The mapping layer should only represent the entities stored in persistent storge. I was at first very tempted to just add the ranking table to the user model but understand now that when there is a uniue entity required consisting of data from multiple related entiites in persistent storage that this is a view-model. This view-model like the ranking table should idely be created using existing mapping so for exmapel it would use the information from the exisintg model but not implement any new mapping directly as I have.

There several different ways of thinkin about the user stats. There are calculation fields but thease aernt always the best and not supported in SQLite I think possibly. Another way is to set tiggers so when a deed is inserted then a stored procudcue is triggered to run and update user stat values. Thease can be stored in perment storage which measn its easier to read the data in some databases as its fast to acces just one cell. However as well as taking up memeory it may be prefrabel to calculate user stats on the fly but this would need to be done each time a request was made even if the data wasn’t changed. The proper enterpirse solution for this in a micro system archtecutre woudle be to implement a service bus or simple just an azure function, In this case each time the user API recied an insert query it would post to the bus and all subscribed services would go and update there values accordingly. In my case I have calculated the values on the fly using SQL which is not good at all the its implemented within the model its self not the mapping layer as mentioned above.

I have maintained a separate git repo with feature branches but only moved this over to the Github Classroom repo in the past few days.

I have included Cypress and jest, didfn’t have enough time ti implement unforntly as I could easily right them and add cy-data attriubutes to all the html classes to allow Cypress to easily navigate about

I have implmnted a signed tokens with a payload container minimal user information. This token is stored in a signed cookie and the information is parsed in the request.user not the body which I for exmapel holds form details.

I had set out a plan for achiving this whole project using ASP.NET with Razor Pages/components and with Local Db within VS for dev and then deploying to azure using VSTS pipeline to a Web App and Microsoft  SQL Server. I ended up starting with the orginal repo tho and thought I would do this if I had time, 
