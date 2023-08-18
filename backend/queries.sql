-- DROP DATABASE `devicecaregh`;
CREATE DATABASE IF NOT EXISTS `devicecaregh`;
USE `devicecaregh`;
-- SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;
-- DROP TABLE `equipment`;

-- Create hospital table
CREATE TABLE IF NOT EXISTS `hospital`(`hosp_id` VARCHAR(100) NOT NULL UNIQUE, `hosp_name` VARCHAR(200) NOT NULL,
`town` VARCHAR(200) NOT NULL, `region` VARCHAR(200) NOT NULL, `address` TEXT, `logo` TEXT
, PRIMARY KEY (`hosp_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 -- Create department table
 CREATE TABLE IF NOT EXISTS `department`(`dept_id` VARCHAR(100) NOT NULL UNIQUE, `dept_name` VARCHAR(200) NOT NULL,
 `hospital_id` VARCHAR(100) NOT NULL, `dept_key` VARCHAR(250)
, PRIMARY KEY (`dept_id`),
FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`hosp_id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Vendor table
CREATE TABLE IF NOT EXISTS `vendor`(`vendor_id` VARCHAR(100) NOT NULL UNIQUE, `vendor_name` VARCHAR(200) NOT NULL,
`vendor_email` VARCHAR(200) NOT NULL UNIQUE, `vendor_phone` VARCHAR(200) NOT NULL,`address` TEXT, `vendor_country` VARCHAR(200)
, PRIMARY KEY (`vendor_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create User table
 CREATE TABLE IF NOT EXISTS `user`(`user_id` VARCHAR(100) NOT NULL UNIQUE, `first_name` VARCHAR(200) NOT NULL,
 `surname` VARCHAR(200) NOT NULL, `other_name` VARCHAR(200), `email` VARCHAR(200) NOT NULL UNIQUE, `password` VARCHAR(200) NOT NULL,
 `phone` VARCHAR(60) NOT NULL, `rank` VARCHAR(200), `role` VARCHAR(60) NOT NULL, `dept_id` VARCHAR(100),
 `vendor_id` VARCHAR(100), `duty_post` VARCHAR(100), `profession` VARCHAR(100), `hospital_id` VARCHAR(100), `profile_photo` TEXT
, PRIMARY KEY (`user_id`),
FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`hosp_id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Manufacturer table
CREATE TABLE IF NOT EXISTS `manufacturer`(`manufacturer_id` INT NOT NULL AUTO_INCREMENT, 
`manufacturer_name` VARCHAR(200) NOT NULL
, PRIMARY KEY (`manufacturer_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Create Equipment Table
CREATE TABLE IF NOT EXISTS `equipment`(`asset_number` VARCHAR(200) NOT NULL UNIQUE,
`equip_name` VARCHAR(200) NOT NULL, `model` VARCHAR(100), `serial_number` VARCHAR(100),
`manufacturer_id` INT, `manufac_year` VARCHAR(20), `location` VARCHAR(100),
`dept_id` VARCHAR(100), `hosp_id` VARCHAR(100), `equip_type` VARCHAR(100),
`country_of_origin` VARCHAR(100), `ppm_interval` VARCHAR(100),`lifespan` VARCHAR(100), `date_installed` DATE, `condition` VARCHAR(100),
`remark` TEXT, `vendor_id` VARCHAR(100), `last_updated` DATETIME, `last_updated_by` VARCHAR(100),
PRIMARY KEY (`asset_number`),
FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer` (`manufacturer_id`) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`hosp_id`) REFERENCES `hospital` (`hosp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (`last_updated_by`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Creat Spare-parts
 CREATE TABLE IF NOT EXISTS `spare_part`(`part_id` VARCHAR(100) NOT NULL UNIQUE, `part_name` VARCHAR(100) NOT NULL,
 `serial_number` VARCHAR(100), `initial_quantity` INT NOT NULL, `current_quantity` INT NOT NULL,
 `vendor_id` VARCHAR(100), `hospital_id` VARCHAR(100), `equip_id` VARCHAR(100), `expiry_date` DATE
, PRIMARY KEY (`part_id`),
FOREIGN KEY (`equip_id`) REFERENCES `equipment` (`asset_number`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`hosp_id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Notifications Table
-- CREATE TABLE IF NOT EXISTS `notification`(
-- `notify_id` VARCHAR(40) NOT NULL UNIQUE, `type` VARCHAR(100) NOT NULL,
 -- `content` TEXT, `date_in` DATETIME,
 -- `sender_id` VARCHAR(40),
 -- PRIMARY KEY (`notify_id`),
-- FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
-- )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create user_notfication intermediate table
-- CREATE TABLE IF NOT EXISTS `user_notification`(`notify_id` VARCHAR(40), `reciever_id` VARCHAR(40),
-- FOREIGN KEY (`notify_id`) REFERENCES `notification` (`notify_id`) ON DELETE CASCADE ON UPDATE CASCADE,
-- FOREIGN KEY (`reciever_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
-- );


-- Create PPM-plan table
CREATE TABLE IF NOT EXISTS `ppm_plan`(`plan_id` VARCHAR(100) NOT NULL UNIQUE, `dept_name` VARCHAR(100) NOT NULL,
`planner_id` VARCHAR(100), `due_date` DATE, `status` VARCHAR(100)
, PRIMARY KEY (`plan_id`),
FOREIGN KEY (`planner_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Create equip_ppm_plan table
CREATE TABLE IF NOT EXISTS `equip_ppm_plan`(`plan_id` VARCHAR(100), `equip_id` VARCHAR(200) UNIQUE,`activities` MEDIUMTEXT,
FOREIGN KEY (`plan_id`) REFERENCES `ppm_plan` (`plan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`equip_id`) REFERENCES `equipment` (`asset_number`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ALTER TABLE `equip_ppm_plan` ADD COLUMN `activities` MEDIUMTEXT;

-- Create Review Request table
 CREATE TABLE IF NOT EXISTS `review_request`(`review_id` VARCHAR(100) NOT NULL UNIQUE, `type` VARCHAR(100) NOT NULL,
 `ppm_plan` VARCHAR(100), `spare_part` VARCHAR(100), `status` VARCHAR(100),
 `sent_date` DATETIME, `sender_id` VARCHAR(100), `approved_date` DATETIME
, PRIMARY KEY (`review_id`),
FOREIGN KEY (`ppm_plan`) REFERENCES `ppm_plan` (`plan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`spare_part`) REFERENCES `spare_part` (`part_id`) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create spart_part_ppm_plan table
CREATE TABLE IF NOT EXISTS `spare_part_ppm_plan`(`plan_id` VARCHAR(100), `part_name` VARCHAR(100),
`quantity` INT NOT NULL, `unit_cost` DECIMAL(15,3),`equip_id` VARCHAR(200) NOT NULL,
FOREIGN KEY (`plan_id`) REFERENCES `ppm_plan` (`plan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`equip_id`) REFERENCES `equipment` (`asset_number`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ALTER TABLE `spare_part_ppm_plan` CHANGE `equip_id` `equip_id` VARCHAR(200) NOT NULL; 
-- ALTER TABLE `spare_part_ppm_plan` ADD CONSTRAINT FOREIGN KEY (`equip_id`) REFERENCES `equipment` (`asset_number`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Create Service-Complaint-Request
CREATE TABLE IF NOT EXISTS `service_complaint_request`(`req_id` VARCHAR(100) NOT NULL UNIQUE,
`type` VARCHAR(100), `sender_id` VARCHAR(100), `equipment_id` VARCHAR(200),
`status` VARCHAR(100), `problem_reported` TEXT,
`sent_date` DATETIME, `hosp_id` VARCHAR(100),
`respondent` VARCHAR(100), `response date` DATETIME, `problem found` TEXT,
PRIMARY KEY (`req_id`),
FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`asset_number`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`hosp_id`) REFERENCES `hospital` (`hosp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`respondent`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- DROP TABLE `repair`;

-- Create Repair Table
CREATE TABLE IF NOT EXISTS `repair`(`repair_id` VARCHAR(100), `equipment_id` VARCHAR(200),
`status` VARCHAR(100), `service_request` VARCHAR(100), `date_started` DATETIME,
`date_ended` DATETIME, `lead_engineer`VARCHAR(100),
PRIMARY KEY (`repair_id`),
FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`asset_number`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`service_request`) REFERENCES `service_complaint_request` (`req_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (`lead_engineer`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create spare_part_for_repair
CREATE TABLE IF NOT EXISTS `spare_part_for_repair`(`repair_id` VARCHAR(100), `spare_part_id` VARCHAR(100) UNIQUE,
FOREIGN KEY (`repair_id`) REFERENCES `repair` (`repair_id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`spare_part_id`) REFERENCES `spare_part` (`part_id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- SHOW TABLES; 
SELECT * FROM `user`;
SELECT * FROM `hospital`;
SELECT * FROM `vendor`;
SELECT * FROM `department`;
SELECT * FROM `manufacturer`;
SELECT * FROM `equipment`;
SELECT * FROM `spare_part`;

-- delete from user where user_id = 'Cli_OHN@ARH-MH-625' and hospital_id='ARH525' and role != 'Admin';
-- select u.first_name, u.surname, u.other_name, u.email, u.phone, u.duty_post,u.role, u.rank, u.profession, d.dept_name, v.company_name as vendor_name from user as u left join department as d on u.dept_id = d.dept_id left join vendor as v on u.vendor_id = v.vendor_id where u.hospital_id = 'KBTH235' and u.user_id != 'Adm_JAS@KBTH-211';

-- select u.first_name, u.surname, u.other_name, u.email, u.phone, d.dept_name from user as u join department as d on u.dept_id = d.dept_id where u.dept_id != 'Phy@KBTH501'  and u.role = 'Engineer'
-- select e.*,d.dept_id,d.dept_name, m.*, v.*, u.first_name,u.surname,u.other_name  from equipment as e join department as d on e.dept_id = d.dept_id join manufacturer as m on e.manufacturer_id = m.manufacturer_id join vendor as v on e.vendor_id = v.vendor_id left join user as u on e.last_updated_by = u.user_id where d.dept_id = ?;
-- select e.*,d.dept_name, m.manufacturer_name, v.company_name as vendor_name,v.vendor_email,v.vendor_phone, v.address, v.vendor_country, u.first_name,u.surname,u.other_name  from equipment as e join department as d on e.dept_id = d.dept_id join manufacturer as m on e.manufacturer_id = m.manufacturer_id join vendor as v on e.vendor_id = v.vendor_id left join user as u on e.last_updated_by = u.user_id where e.hosp_id = 'KBTH235' order by e.equip_name;
-- Select dept_key from `department`;
-- update equipment set location = ?, dept_id = ?,ppm_interval = ?, `condition` = ?, remark = ?, last_updated = ?, last_updated_by = ? where asset_number = ? or serial_number = ?

-- ALTER TABLE equipment CHANGE `lifespan` `lifespan` VARCHAR(100);
-- ALTER TABLE spare_part DROP `serial_number`;
-- delete from equipment where equip_name = 'Anaesthesia machine';

-- delete from user where email = 'sejaktech@gmail.com'

-- update department set dept_key = 'hjdsjhk' where dept_id = 'Phy@KBTH980' and hospital_id = 'KATH123';
-- select h.hosp_id, h.hosp_name, d.dept_id,d.dept_name from hospital as h join department as d where h.hosp_id = 'KBTH649' and d.dept_name like 'Obstetrics and Gynaecology';
-- insert into `user` values('eyiuer', 'Kofi', 'Asiamah', 'Johnson','kofiaj@gmail.com','nas12m','0451234567',null,'Admin',true,null,null,null,null,null,null);
-- select u.email, h.hosp_id from user as u join hospital as h where u.email = 'kofiaj@gmail.com' and h.hosp_id = 'MSMH20';

-- insert into user
  -- values('muewio', 'Kofi', 'Asiamah', 'Johnson','kofiaj@gmail.com','nas12m','0451234567','Chief Technologist','Admin',false,null,null,null,null,'MSMH20',null);

-- delete from hospital where hosp_name = '37 Military Hospital';
-- delete from user where email = 'magloria@gmail.com';
-- delete from vendor where vendor_email = 'sejaktech@gmail.com';
-- delete from department where hospital_id = 'KBTH649'

-- select h.hosp_name, u.email from hospital as h join `user` as u where h.hosp_name = `Komfo Anokye Teaching Hospital` or u.email = `bbacheampong@gmail.com`;

-- select email, password, role from user where email = 'uiremseet@gmail.com';
-- update manufacturer set manufacturer_name ='Philips' where manufacturer_id = 1;

-- update user set phone = '0543149941' where `user_id` = 'Adm_JAS@KBTH';
-- insert into department values('DPT@KBTH','Dental Clinic','KBTH649','OBS&GYNE-KBTH');

-- select h.hosp_id, h.hosp_name, d.dept_id,d.dept_name from hospital as h join department as d where h.hosp_id = 'KBTH235' and (d.dept_name like 'Physiotherapy' or d.dept_id = 'undefined');