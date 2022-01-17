# Skillset Verified

A blockchain-based skill verification system can help reduce the time spent on conducting competency checks, skill verification and build more trust in the skill and competency management within the organisation. With Blockchain, an employee can have his/her skills recorded on an available network which are also verified and approved by their previous managers/employers. Thus with a skill chain based on the blockchain for an employee, we can be completely assured of the skills, experience, learning goal progress and their competency level along with a transparency of who have endorsed the employees on these skills. Further, this will help organisation to help optimally leverage credible employees for respective business needs.

### Deployments

- **Video Demo** - https://vimeo.com/629030779/cb18ff23a5
- **Flowchart** - https://whimsical.com/frontend-PkzGdD585qXChFvYVDebCh
- **Deployed URL** - https://kind-grass-06d9d2100.azurestaticapps.net/

### Use cases

1. Can be used by the HR for smooth hiring process.
2. Can be used by the employee to get into the company of his dreams.
3. Can be used to do competency checks.
4. Can be used to chat with organizations & employees.

## Features

- The Website has a _**search feature**_ for both employee and HR for searching perticular person for Job requirement matches.
- _**Notificaton**_ System to alert the employee for the scheduled interview.
- Notification For Certifications and skill endorsements.
- _**Charts and graphs**_ in the employee profile page to show the endorsement ratings, certifications time and date.
- _**Barcode scanner**_ to scan the the barcode generated from the public key hash of the employee and organization to make connecting more easy.
- In App _**chat feature**_ to allow employees and HR connect with each other.Employees can request for a endorsement for a skill,certification and experience and HR can connect with employee for a interview.
- Chats are _**end to end encrpted**_ using public-private key cryptography.
- Login is being handled by your metamask account so there is no requirement for the signup/signin.

### Brief Flow Diagram
![image](https://user-images.githubusercontent.com/64866670/139016957-94d8ff46-c6c8-4c36-97bb-7e75473e3ae3.png)

---

## Roles

1. **No Role**
    - A user having a ethereum account can send he admins his/her profile and cha with them as well.
    - He can request for any role employee or organization.


2. **Admin**
    - Registers a new user on the blockchain.
    - Controls any ambiguity in the blockchain.
    - Responds to role requests from users.
    - Maintains and scale users.
    - Can revove/reassign roles of users.


3. **Employees**
    - This smart contract is for the employee, It will be storing data regarding the employee:
    - Employee Name, overall endorsement Rating, each skill listed along with its endorsement rating(scale 1-10).
    - Certifications - There will be 2 types of certifications verified and not verified. A certification is considered verified when the organization providing the certificate approves it on the blockchain.
    - Work Experiences - It will contain the fields like (Organization name, Job Title, Description etc.) it will be of two types verified and not. It is considered verified if the organization approves it on blockchain.
    - Platform Ratings (Like Hackerearth, Codechef, Codeforces etc.) .These Ratings will be verified via a API call to the server of given platforms and the exact ratings will be displayed on the page so there is no need to click on a bunch of links to verify.
    - Education Verification - These details are crosschecked with the transcript provided by the employee (or if the university/college provides a API domain to recheck the results it will be implemented) which is then stored in the blockchain.



4. **Organization Endorser**
    - This smart contract is for the organizations. It can be used by the organizations to verify the skillset, work experience, education, certifications of their employees.The smart contracts contains:
    - Organization Name.
    - It contains a mapping of the current employees of this organization, and these employees are certified to endorse a skill, work experience and education of another employee. Only the current employees are authorized to do so not the past employees.
    - It contains a list of all the HRs, Talent aquisition team and all the employees working in the organization.
    - It will be having a feature to update job title of a employee.
    - It will have a feature to grant a certificate to an employee for their achivements and it will be displayed on their profiles.
    - It will have a feature to search employees on the blockchain according to the job description and invite them for an interview.

## Thumbnails
![1](https://user-images.githubusercontent.com/64866670/139017444-553f4e7a-b3bd-4e45-b4a9-5d5d6c9a4ff3.png)
![2](https://user-images.githubusercontent.com/64866670/139017530-f4ce07a3-2888-48e4-a7b1-86c5adfbb69d.png)
![3](https://user-images.githubusercontent.com/64866670/139017569-2018caf2-3d14-47c6-bf52-74c066ec57c2.png)
![4](https://user-images.githubusercontent.com/64866670/139017586-0890110f-e538-4627-9190-7eda686afa37.png)
![5](https://user-images.githubusercontent.com/64866670/139017605-a8468e44-6882-4ac7-9466-a2d80c6ab0bd.png)
![6](https://user-images.githubusercontent.com/64866670/139017624-0859fecb-49d3-4f65-99cd-389ba30dda96.png)
![7](https://user-images.githubusercontent.com/64866670/139017487-2c2c31e9-f392-4eb9-a64e-5d773958dc1c.png)



