---
layout: page
title: Artifacts & Narratives
permalink: /pages/artifacts.html
---

# Artifacts & Narratives  

This section of my ePortfolio highlights three enhanced artifacts that represent core areas of computer science: **software design and engineering, algorithms and data structures, and databases**.  

All three artifacts originate from my CS 465 full stack project, *Travlr Getaways*, a MEAN stack travel booking application. Through enhancements, I demonstrated how to take classroom code and evolve it into **professional-quality software** that emphasizes maintainability, scalability, and reliability.  

![MEAN Stack Diagram]({{ site.baseurl }}/assets/images/mean_stack_diagram.png)  
*Figure: Architecture of the MEAN stack used in the Travlr Booking project.*

---

## Software Design & Engineering  

![Software Design Banner]({{ site.baseurl }}/assets/images/software_banner.png)  

**[View Artifact & Narrative →](artifact-software.html)**  

This artifact focuses on the **Express server** at the heart of the back end. The original `app.js` file mixed routing, configuration, and error handling into one monolithic script.  

The enhancement refactored the server into **modular middleware** for logging, CORS, and error handling, while keeping routes lightweight and focused. This demonstrates my ability to structure back-end applications for clarity, maintainability, and long-term scalability.  

---

## Algorithms & Data Structures  

![Algorithms Banner]({{ site.baseurl }}/assets/images/algorithms_banner.png)  

**[View Artifact & Narrative →](artifact-algorithms.html)**  

This artifact highlights the **Angular front end** and how it consumes trip data from the API. The original `Trip` interface used weak typing (`string` for fields like `length` and `perPerson`).  

The enhancement applied **stronger typing** and alignment with the database schema, ensuring reliable data flow between the database → API → front end. This showcases my skills in **data structure design, type safety, and cross-layer consistency**.  

---

## Databases  

![Databases Banner]({{ site.baseurl }}/assets/images/databases_banner.png)  

**[View Artifact & Narrative →](artifact-databases.html)**  

This artifact highlights the **MongoDB schema** that defines how trip data is stored. The original schema treated numeric values like `length` and `perPerson` as strings, and lacked indexing for performance.  

The enhancement upgraded the schema by converting weakly typed fields to **numbers**, adding **indexing**, and enforcing **validation**. This improved data integrity, made queries faster, and prepared the schema for production use.  

---

## Summary  

Together, these artifacts show my ability to work across the **entire MEAN stack**:  
- Structuring **server code** with modular middleware  
- Strengthening **database models** for integrity and performance  
- Ensuring **type-safe structures** across the front end  

These enhancements reflect not only my technical growth but also my readiness to apply **software engineering principles** in professional environments. By refactoring, optimizing, and aligning each layer of the stack, I demonstrated the skills necessary to design, build, and maintain reliable full stack applications.  
