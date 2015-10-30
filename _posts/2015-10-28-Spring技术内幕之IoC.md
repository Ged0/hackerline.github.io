---
layout: post
title: Spring技术内幕之IoC
categories: [Java]
---

###IoC:Inversion of Control 控制反转
目前主要有两种：

依赖注入: Dependency Injection

依赖查找: Dependency Lookup

#####Spring IoC容器

在对象生成或初始化是将数据注入到对象中，或者将对象引用注入到对象数据域中的方式来注入对方法调用的依赖。

依赖注入是可以递归的，逐层的注入，将依赖关系有序的建立起来，简化了对象依赖关系的管理，很大程度上降低了系统的复杂度，解耦组件之间复杂关系的利器。

应用系统中，除了一些数据对象以外，其他的对象都是用来处理数据的，这部分对象相互之间依赖关系比较稳定，一般不会随着系统的运行状态而改变，这些特性使得这些对象非常适合使用IoC容器来进行管理。


#####BeanFactory:Spring IoC基本容器的规范

ApplicationContext : 通过继承MessageSource，ResourceLoader，ApplicationEventPublisher，给IoC容器添加了很多高级特性的支持

#####DefaultListableBeanFactory:

Resource: 配置文件源	
XmlBeanDefinitionReader: 读取配置文件 

example：

	ClassPathResource res = new ClassPathResource("beans.xml"); //Bean配置文件，包含了BeanDefinition的定义信息
	DefaultListableBeanFactory factory = new DefaultListableBeanFactory(); //创建beanFactory
	XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(factory); //创建一个reader，提供回调给Factory
	reader.loadBeanDefinations(res);	//reader完成信息的载入和注册


**ApplicationContext：**  
1.MessageSource：支持不同的信息源  
2.ResouceLoader：可以从不同的地方获取定义资源  
3.ApplicationEvenPublisher：事件机制，与bean生命周期结合为bean的管理提供了便利  
4.各种附加功能

**IoC容器初始化：**  

***1.Resource定位：***  
FileSystemResource 从文件系统载入配置文件  
ClassPathResource  从classpath载入配置文件
	
***2.BeanDefinition载入：把配置文件中的数据转化为BeanDefinition实例***

	public FileSystemXmlApplicationContext(String[] configLocations, boolean refresh, ApplicationContext parent)
			throws BeansException {
		super(parent);
		setConfigLocations(configLocations);
		//refresh 就是BeanDefinition的入口
		if (refresh) {
			refresh();
		}
	}
	
		public void refresh() throws BeansException, IllegalStateException {
		synchronized (this.startupShutdownMonitor) {
			// Prepare this context for refreshing.
			prepareRefresh();
			// Tell the subclass to refresh the internal bean factory.
			ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();
			// Prepare the bean factory for use in this context.
			prepareBeanFactory(beanFactory);
			try {
				// Allows post-processing of the bean factory in context subclasses.
				postProcessBeanFactory(beanFactory);

				// Invoke factory processors registered as beans in the context.
				invokeBeanFactoryPostProcessors(beanFactory);

				// Register bean processors that intercept bean creation.
				registerBeanPostProcessors(beanFactory);

				// Initialize message source for this context.
				initMessageSource();

				// Initialize event multicaster for this context.
				initApplicationEventMulticaster();

				// Initialize other special beans in specific context subclasses.
				onRefresh();

				// Check for listener beans and register them.
				registerListeners();

				// Instantiate all remaining (non-lazy-init) singletons.
				finishBeanFactoryInitialization(beanFactory);

				// Last step: publish corresponding event.
				finishRefresh();
			}

			catch (BeansException ex) {
				// Destroy already created singletons to avoid dangling resources.
				destroyBeans();
				// Reset 'active' flag.
				cancelRefresh(ex);
				// Propagate exception to caller.
				throw ex;
			}
		}
	}
***3.BeanDefinition注册: 将BeanDefinition对象注册到IoC容器的HashMap中***  
根据PropertyValue来进行对应的注入。主要用到了Java反射原理。
	
**其他特性**：  
ApplicationContext 容器的初始化和销毁  
lazy-init:在注册完成后直接对对象进行实例化  
FactoryBean：可以用来封装Proxy，RMI，JNDI等  
	
