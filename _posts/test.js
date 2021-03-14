// 객체 리터럴 방식
var foo = {
    name: 'foo',
    gender: 'male'
  }
  
  console.dir(foo);
  
  // 생성자 함수 방식
  function Person(name, gender) {
    this.name = name;
    this.gender = gender;
  }
  
  var me  = new Person('Lee', 'male');
  console.dir(me);
  
  var you = new Person('Kim', 'female');
  console.dir(you);